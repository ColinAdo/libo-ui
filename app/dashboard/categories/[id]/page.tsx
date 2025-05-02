"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useParams } from 'next/navigation'
import { Input } from "@/components/ui/input";
import { PostsGrid, PageTitle } from "@/components/dashboard";
import { useRetrieveCategoryBookQuery } from "@/redux/features/bookSlice";


export default function Page() {
    const params = useParams();
    const idParam = params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    const [searchTerm, setSearchTerm] = useState("");
    const { data: books } = useRetrieveCategoryBookQuery(id);

    const filteredPosts = books?.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-5 w-full mt-12">
            <div className="flex justify-between items-center mb-4">
                <PageTitle title="Books On Finance" />
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