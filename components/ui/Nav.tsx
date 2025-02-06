"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
// import { useGetAccountsQuery } from "@/redux/features/accountSlice";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavProps {
    isCollapsed: boolean;
    links: {
        title: string;
        label?: string;
        icon: LucideIcon;
        variant: "default" | "ghost";
        href: string;
    }[];
}

export function Nav({ links, isCollapsed }: NavProps) {
    //   const { data: accounts } = useGetAccountsQuery();
    const pathname = usePathname();

    return (
        <TooltipProvider>
            <div
                data-collapsed={isCollapsed}
                className={cn(
                    "group flex flex-col gap-4 py-2",
                    isCollapsed && "data-[collapsed=true]:py-2"
                )}
            >
                <nav
                    className={cn(
                        "grid gap-1 px-2",
                        isCollapsed && "group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2"
                    )}
                >
                    {links.map((link, index) => {
                        const linkContent = (
                            <>
                                <link.icon className={cn("mr-2 h-4 w-4", isCollapsed && "h-4 w-4")} />
                                {!isCollapsed && (
                                    <>
                                        {link.title}
                                        {link.label && (
                                            <span
                                                className={cn(
                                                    "ml-auto",
                                                    link.variant === "default" && "text-background dark:text-white"
                                                )}
                                            >
                                                {link.label}
                                            </span>
                                        )}
                                    </>
                                )}
                            </>
                        );

                        return (
                            <Tooltip key={index} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            buttonVariants({
                                                variant: link.href === pathname ? "default" : "ghost",
                                                size: isCollapsed ? "icon" : "sm",
                                            }),
                                            "h-9 w-full flex items-center gap-2 px-3 rounded-md transition-colors",
                                            link.href === pathname
                                                ? "bg-gray-900 text-white dark:bg-gray-700 dark:text-white" // Active link styles
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white",
                                            !isCollapsed && "justify-start"
                                        )}
                                    >
                                        <link.icon className="h-4 w-4" /> {/* Ensures icon takes the active text color */}
                                        {!isCollapsed && (
                                            <span className="text-inherit"> {/* This makes the text follow the color of the parent */}
                                                {link.title}
                                            </span>
                                        )}
                                    </Link>

                                </TooltipTrigger>
                                {isCollapsed && (
                                    <TooltipContent side="right" className="flex items-center gap-4">
                                        {link.title}
                                        {link.label && (
                                            <span className="ml-auto text-muted-foreground">{link.label}</span>
                                        )}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        );
                    })}
                </nav>
            </div>
        </TooltipProvider>
    );
}