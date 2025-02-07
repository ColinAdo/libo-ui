"use client";

import { Button } from "@/components/ui/button";
import { Nav } from "@/components/ui/Nav";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { useGetCategoriesQuery } from "@/redux/features/bookSlice";
import { useWindowWidth } from "@react-hook/window-size";
import { useEffect, useState } from "react";

import {
    BadgePlus,
    Book,
    Brain,
    Briefcase,
    ChevronRight,
    DollarSign,
    LayoutDashboard,
    LucideIcon,
    UserRound,
    Users
} from "lucide-react";

export default function Sidebar() {
    const { data: categories } = useGetCategoriesQuery();
    const { data: user } = useRetrieveUserQuery();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mobilewidth, setMobileWidth] = useState(false);
    const onlyWidth = useWindowWidth();

    useEffect(() => {
        setMobileWidth(onlyWidth < 768);
    }, [onlyWidth]);

    function toggleSidebar() {
        setIsCollapsed(!isCollapsed);
    }

    const getCategoryIcon = (category: string): LucideIcon => {
        if (category.includes("Leadership")) return Users;
        if (category.includes("Finance")) return DollarSign;
        if (category.includes("Mindset")) return Brain;
        if (category.includes("Business")) return Briefcase;
        return Book; // Default fallback
    };


    // Explicitly type the default links array
    const defaultLinks: { title: string; label?: string; icon: LucideIcon; variant: "default" | "ghost"; href: string }[] = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            variant: "default",
            href: "/dashboard",
        },
        {
            title: "Create",
            icon: BadgePlus,
            variant: "ghost",
            href: "/dashboard/create/account",
        },
        {
            title: "Profile",
            label: "",
            icon: UserRound,
            variant: "ghost",
            href: `/dashboard/${user?.username}`,
        },
    ];

    // Dynamically generate category links
    const categoryLinks =
        categories?.map((category) => ({
            title: category.title,
            icon: getCategoryIcon(category.title),
            label: category.book_count > 0 ? category.book_count.toString() : "",
            variant: "ghost" as const,
            href: `/dashboard/categories/${category.id}`,
        })) || [];

    return (
        <div className={`relative ${isCollapsed ? "min-w-[80px]" : "min-w-[160px]"} mt-12 border-r px-3 pt-20 pb-10`}>
            {!mobilewidth && (
                <div className="absolute top-7">
                    <Button
                        onClick={toggleSidebar}
                        className="bg-white text-black hover:bg-slate-300"
                    >
                        <ChevronRight />
                    </Button>
                </div>
            )}
            <Nav
                isCollapsed={mobilewidth ? true : isCollapsed}
                links={[...defaultLinks, ...categoryLinks]}
            />
        </div>
    );
}
