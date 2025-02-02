"use client";

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Bookmark, Heart, BookOpenCheck } from "lucide-react";
// import { ProfileData } from "@/lib/exports";

const profileTabs = [
    {
        title: "Liked",
        href: "",
        Icon: Heart,
    },
    {
        title: "Saved",
        href: "saved",
        Icon: Bookmark,
    },
    {
        title: "Read",
        href: "read",
        Icon: BookOpenCheck,
    },
];

export default function ProfileTabs({
    username,
    isCurrentUser,
}: {
    username: string;
    isCurrentUser: boolean;
}) {
    const pathname = usePathname();

    return (
        <Tabs defaultValue="posts" className="pb-16">
            <TabsList className="p-px bg-zinc-300 dark:bg-neutral-800 h-px w-full gap-x-10">
                {profileTabs
                    .filter((tab) => isCurrentUser || tab.href !== "saved")
                    .map((tab) => {
                        const profilePage = `/dashboard/${username}`;
                        const isActive =
                            tab.href === ""
                                ? pathname === profilePage
                                : pathname === `${profilePage}/${tab.href}`;

                        return (
                            <TabsTrigger
                                key={tab.href}
                                value={tab.href}
                                className={cn(
                                    "flex-col mt-8 gap-4 !p-0 data-[state=active]:text-neutral-400",
                                    isActive
                                        ? "!text-neutral-700 dark:!text-white"
                                        : "text-neutral-400"
                                )}
                                asChild
                            >
                                <Link
                                    href={`/dashboard/${username}/${tab.href}`}
                                >
                                    <Separator
                                        className={cn(
                                            "!h-px w-16",
                                            isActive
                                                ? "!bg-neutral-700 dark:!bg-white"
                                                : "dark:!bg-neutral-800 bg-zinc-300"
                                        )}
                                    />
                                    <div className="flex items-center gap-x-1">
                                        <tab.Icon className="h-3 w-3" />
                                        <p className="font-bold text-xs tracking-widest uppercase">
                                            {tab.title}
                                        </p>
                                    </div>
                                </Link>
                            </TabsTrigger>
                        );
                    })}
            </TabsList>
        </Tabs>
    );
}