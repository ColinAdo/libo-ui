"use client";

import { Spinner } from "@/components/common";
import { Button } from "@/components/ui/button";
import { useWebSocketContext } from "@/hooks/WebSocketContext";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useUploadPdfMutation } from "@/redux/features/bookSlice";
import { BookType } from "@/types/exports";
import { Bookmark, BookOpen, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
    book: BookType
}

export default function BookDetail({ book }: Props) {
    const router = useRouter();
    const { data: user } = useRetrieveUserQuery();
    const [uploadPdf, { isLoading }] = useUploadPdfMutation();
    const { sendJsonMessage } = useWebSocketContext();

    const isLiked = book.likes.some((like) => like.user === user?.id);
    const isBookmarked = book.bookmarks.some((bookomark) => bookomark.user === user?.id);

    const data = {
        id: book.id,
    }

    const onLike = async () => {
        sendJsonMessage({
            event: "like_book",
            data,
        });
    };

    const onBookmark = async () => {
        sendJsonMessage({
            event: "bookmark_book",
            data,
        });
        toast.success("You bookmarked this book");
        console.log("Submitted data :", data)
    };

    const handleReadClick = async () => {
        try {
            const response = await uploadPdf(book.pdf_file).unwrap(); // response = { sourceId: "xyz" }
            const sourceId = response.sourceId;
            router.push(`/dashboard/read/${book.id}?sourceId=${sourceId}`);
        } catch (error) {
            console.error("Error uploading PDF:", error);
            toast.error("Failed to load PDF chat. Please try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 shadow-lg dark:border rounded-lg">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <Image
                        src={book.cover_image || "/placeholder.svg"}
                        alt={`Cover of ${book.title}`}
                        width={300}
                        height={450}
                        className="w-full h-64 md:h-auto md:w-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    />
                </div>
                <div className="p-8 flex flex-col justify-between flex-grow">
                    <div>
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{book.author}</div>
                        <h1 className="mt-1 text-3xl dark:text-white leading-tight font-bold text-gray-900">{book.title}</h1>
                        <p className="mt-4 dark:text-gray-200 text-gray-600">{book.description}</p>
                    </div>
                    <div className="mt-6 flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <Button onClick={onLike} className="bg-transparent hover:bg-transparent">
                                <Heart className={isLiked ? "text-green-800 fill-green-800" : "text-gray-800 fill-white"} />
                            </Button>
                            <span className="text-gray-400 font-bold">{book.likes_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Button onClick={onBookmark} className="bg-transparent hover:bg-transparent">
                                <Bookmark className={isBookmarked ? "text-green-800 fill-green-800" : "text-gray-800 fill-white"} />
                            </Button>
                            <span className="text-gray-400 font-bold">{book.bookmarks_count}</span>
                        </div>

                        <div className="flex items-center space-x-1 cursor-pointer" onClick={handleReadClick}>
                            <BookOpen className="w-5 h-5 text-blue-500" />
                            <span className="text-gray-600">
                                {isLoading ? <Spinner sm /> : "Read"}
                            </span>
                        </div>

                        {/* <div className="flex items-center space-x-1">
                            <BookOpen className="w-5 h-5 text-blue-500" />
                            <Link href={`/dashboard/read/${book.id}`}><span className="text-gray-600">Read</span></Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
