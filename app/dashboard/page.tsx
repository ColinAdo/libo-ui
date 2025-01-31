"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Card from "@/components/dashboard/Card";
// import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { PostsGrid } from "@/components/dashboard";
import {
  PageTitle,
} from "@/components/dashboard";


const posts = [
  {
    id: "1",
    fileUrl: "/assets/demo.jpeg",
    likes_count: 40,
    bookmark_count: 50,
    description: "description"
  },
  {
    id: "2",
    fileUrl: "/assets/demo.jpeg",
    likes_count: 40,
    bookmark_count: 50,
    description: "description"
  },
  {
    id: "3",
    fileUrl: "/assets/demo.jpeg",
    likes_count: 40,
    bookmark_count: 50,
    description: "description"
  },
  {
    id: "4",
    fileUrl: "/assets/demo.jpeg",
    likes_count: 40,
    bookmark_count: 50,
    description: "description"
  },
  {
    id: "5",
    fileUrl: "/assets/demo.jpeg",
    likes_count: 40,
    bookmark_count: 50,
    description: "description"
  },

];


export default function Page() {
  const { data: user } = useRetrieveUserQuery();
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
      <PageTitle title="Dashboard" />
      <section>
        {/* {accounts.map((account, i) => (
          <Card key={i} accounts={[account]} />
        ))} */}
        <PostsGrid posts={posts} />
      </section>
    </div>
  );
}