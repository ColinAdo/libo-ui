import Image from "next/image"
import { BookType } from "@/types/exports"
import { Heart, Bookmark, BookOpen } from "lucide-react"
import Link from "next/link"

interface Props {
    book: BookType
}

export default function BookDetail({ book }: Props) {
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
                            <Heart className="w-5 h-5 text-red-500" />
                            <span className="text-gray-600">{book.likes_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Bookmark className="w-5 h-5 text-blue-500" />
                            <span className="text-gray-600">{book.bookmarks_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <BookOpen className="w-5 h-5 text-blue-500" />
                            <Link href={`/dashboard/read/${book.id}`}><span className="text-gray-600">Read</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
