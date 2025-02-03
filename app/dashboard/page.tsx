"use client";

import { useEffect, useState } from "react";
import Card from "@/components/dashboard/Card";
// import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { PostsGrid } from "@/components/dashboard";
import {
  PageTitle,
} from "@/components/dashboard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";


const posts = [
  {
    id: "1",
    fileUrl: "/assets/demo.jpeg",
    likes_count: 40,
    bookmark_count: 50,
    description: "Think and Grow Rich"
  },
  {
    id: "2",
    fileUrl: "/assets/demo.jpeg",
    likes_count: 40,
    bookmark_count: 50,
    description: "Your next five moves"
  },
  {
    id: "3",
    fileUrl: "/assets/demo.jpeg",
    likes_count: 40,
    bookmark_count: 50,
    description: "Rich dad poor dad"
  },
  {
    id: "4",
    fileUrl: "/assets/demo.jpeg",
    likes_count: 40,
    bookmark_count: 50,
    description: "Atomic Habits"
  },
  {
    id: "5",
    fileUrl: "/assets/demo.jpeg",
    likes_count: 40,
    bookmark_count: 50,
    description: "Good to Great"
  },

];


export default function Page() {
  const { data: user } = useRetrieveUserQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter(post =>
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const { lastJsonMessage } = useWebSocketContext();

  // useEffect(() => {
  //   console.log("Updated realtimeMessages:", lastJsonMessage);
  //   refetch();
  //   refetchTransactions();
  //   refetchAccountAnalytics();
  //   refetchTransactionAnalytics();
  // }, [lastJsonMessage]);

  if (!user) {
    return;
  }

  return (
    <div className="flex flex-col gap-5 w-full">
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
      <PostsGrid posts={filteredPosts} />
    </div>
  );
}

// return (
//   <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//           <PageTitle title="Your Books" />
//           <div className="flex items-center gap-2">
//               <Search size={32} className="hidden sm:block" />
//               <Input
//                   type="text"
//                   placeholder="Search books..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-[100] border border-gray-500 dark:border-white rounded p-2"
//               />
//           </div>
//       </div>
//       <PostsGrid posts={filteredPosts} />
//   </div>
// );