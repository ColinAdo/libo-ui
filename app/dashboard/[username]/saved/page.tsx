"use client";

import { useEffect, useState } from "react";
import { PostsGrid } from "@/components/dashboard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PageTitle } from "@/components/dashboard";
import { ProfileTabs } from "@/components/dashboard";
import { useGetBookmarkedBooksQuery } from "@/redux/features/bookSlice";
import { useWebSocketContext } from "@/hooks/WebSocketContext";

interface Props {
    params: {
        username: string;
    };
}

export default function Page({ params: { username } }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: books, refetch } = useGetBookmarkedBooksQuery();
    const { lastJsonMessage } = useWebSocketContext();

    const filteredBooks = books?.filter(book =>
        (book.description || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        refetch();
    }, [lastJsonMessage]);

    return (
        <div className="p-4 mt-12">
            <div className="flex justify-between items-center mb-4">
                <PageTitle title="Your Bookmarked Books" />
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
            <ProfileTabs isCurrentUser={true} username={username} />
            <PostsGrid books={filteredBooks} />
        </div>
    );
}