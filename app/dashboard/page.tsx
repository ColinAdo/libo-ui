"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PostsGrid, PageTitle } from "@/components/dashboard";
import { useGetBooksQuery } from "@/redux/features/bookSlice";
import { useWebSocketContext } from "@/hooks/WebSocketContext";

export default function Page() {
  const { data: books, refetch } = useGetBooksQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const { lastJsonMessage } = useWebSocketContext();

  const filteredPosts = books?.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    console.log("Updated realtimeMessages:", lastJsonMessage);
    refetch();
  }, [lastJsonMessage]);

  return (
    <div className="flex flex-col gap-5 w-full mt-12">
      <div className="flex justify-between items-center mb-4">
        <PageTitle title="Books" />
        <div className="flex items-center gap-2">
          <Search size={32} className="hidden sm:block" />
          <Input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[100] border border-gray-500 dark:border-white rounded p-2"
          />
        </div>
      </div>
      <PostsGrid books={filteredPosts} />
    </div>
  );
}