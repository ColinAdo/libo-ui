"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, HeartIcon } from "lucide-react";
import { BookType } from "@/types/exports";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";

interface Props {
    books: BookType[] | undefined;
}

export default function PostsGrid({ books }: Props) {
    const { data: user } = useRetrieveUserQuery();

    if (books?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
                <p className="font-semibold text-sm text-neutral-400">No book found.</p>
            </div>
        );
    }

    return (
        <div className="grid w-full sm:h-100 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {books?.map((book) => {
                // Check if the user has liked or bookmarked the book
                const isLiked = book.likes.some((like) => like.user === user?.id);
                const isBookmarked = book.bookmarks.some((bookomark) => bookomark.user === user?.id);

                return (
                    <div key={book.id}>
                        <Link
                            href={`/dashboard/book/${book.id}`}
                            className="relative flex items-center justify-center h-80 group col-span-1"
                        >
                            <Image
                                src={book.cover_image || "/assets/demo.jpeg"}
                                fill
                                alt="books preview"
                                className="object-cover rounded-sm -z-10 transition group-hover:filter group-hover:blur-[2px] group-hover:brightness-90"
                            />
                            <div className="opacity-0 group-hover:opacity-100 flex transition items-center justify-center space-x-6">
                                {book.likes_count > 0 && (
                                    <div className="flex items-center font-bold space-x-1">
                                        <HeartIcon className={isLiked ? "text-red-500 fill-red-500" : "text-white fill-white"} />
                                        <p className="text-white">{book.likes_count}</p>
                                    </div>
                                )}

                                {book.bookmarks_count > 0 && (
                                    <div className="flex items-center font-bold space-x-1">
                                        <Bookmark className={isBookmarked ? "text-black fill-black" : "text-white fill-white"} />
                                        <p className="text-white">{book.bookmarks_count}</p>
                                    </div>
                                )}
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
