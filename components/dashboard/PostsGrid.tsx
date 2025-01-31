import Image from "next/image";
import Link from "next/link";
import { HeartIcon, MessageCircle } from "lucide-react";
import { Posts } from "@/types/exports";

interface Props {
    posts: Posts[];
}

export default function PostsGrid({ posts }: Props) {
    if (posts?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
                <p className="font-semibold text-sm text-neutral-400">No more posts.</p>
            </div>
        );
    }

    return (
        <div className="grid w-full sm:h-100 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {posts?.map((post) => (
                <div key={post.id}>
                    <Link
                        href={`/dashboard/p/${post.id}`}
                        className="relative flex items-center justify-center h-80 group col-span-1"
                    >
                        <Image
                            src={post.fileUrl}
                            fill
                            alt="Post preview"
                            className="object-cover -z-10 transition group-hover:filter group-hover:blur-[2px] group-hover:brightness-90"
                        />
                        <div className="opacity-0 group-hover:opacity-100 flex transition items-center justify-center space-x-6">
                            {post.likes_count > 0 && (
                                <div className="flex items-center font-bold space-x-1">
                                    <HeartIcon className="text-white fill-white" />
                                    <p className="text-white">{post.likes_count}</p>
                                </div>
                            )}

                            {post.bookmark_count > 0 && (
                                <div className="flex items-center font-bold space-x-1">
                                    <MessageCircle className="text-white fill-white" />
                                    <p className="text-white">{post.bookmark_count}</p>
                                </div>
                            )}
                        </div>
                    </Link>
                    <div className="w-full text-white dark:text-black bg-black font-bold dark:bg-white">
                        <Link href={`/dashboard/p/${post.id}`} ><p className="mt-2 text-center">{post.description}</p> </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}