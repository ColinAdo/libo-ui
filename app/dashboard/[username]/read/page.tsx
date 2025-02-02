"use client";

import { PageTitle, ProfileTabs } from "@/components/dashboard";
import { PostsGrid } from "@/components/dashboard";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search } from 'lucide-react';

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
];

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPosts = posts.filter(post =>
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <PageTitle title="Colin Books" />
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
            <ProfileTabs isCurrentUser={true} username="ado" />
            <PostsGrid posts={filteredPosts} />
        </div>
    );
}