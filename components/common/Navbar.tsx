"use client";

import Link from "next/link";
import { SquareLibrary } from "lucide-react";
import { ThemeToggler } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logout as setLogout } from "@/redux/features/authSlice";
import {
  useLogoutMutation,
  useRetrieveUserQuery,
} from "@/redux/features/authApiSlice";
import {
  LogOut,
  BadgePlus,
  UserRound,
  LogIn,
  UserRoundPlus,
  AlignJustify,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Stateless Function components (sfc)
export default function Navbar() {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const { data: user } = useRetrieveUserQuery();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      });
  };
  return (
    <div
      className={`header left-0 sm:left-8 p-2 top-0 z-40 flex justify-between w-full items-center
      "dark:bg-black fixed z-[9999] bg-white dark:bg-black !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
      "absolute bg-transparent"
     `}
    >

      {isAuthenticated ? (
        <Link href="/dashboard">
          <SquareLibrary className="dark:text-white" />
        </Link>
      ) : (
        <Link href="/">
          <SquareLibrary className="dark:text-white" />
        </Link>
      )}

      <div className="flex item-center lg:px-14">
        {isAuthenticated && user?.username[0] ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar>
                <AvatarFallback className="text-black bg-slate-300 font-bold">
                  {user?.username[0]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/dashboard/${user?.username}`} className="flex justify-between">
                  <UserRound className="h-[1.2rem] w-[1.2rem]" />
                  <span className="ml-2">Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/dashboard/create/account"
                  className="flex justify-between"
                >
                  <BadgePlus className="h-[1.2rem] w-[1.2rem]" />
                  <span className="ml-2">Create</span>
                </Link>
              </DropdownMenuItem>
              <ThemeToggler />
              <DropdownMenuItem>
                <LogOut className="h-[1.2rem] w-[1.2rem]" />
                <button onClick={handleLogout}>Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <AlignJustify className="h-[1.2rem] w-[1.2rem] dark:text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/auth/login" className="flex justify-between">
                  <UserRoundPlus className="h-[1.2rem] w-[1.2rem]" />
                  <span className="ml-2">Sign Up</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/auth/login" className="flex justify-between">
                  <LogIn className="h-[1.2rem] w-[1.2rem]" />
                  <span className="ml-2">Sign In</span>
                </Link>
              </DropdownMenuItem>
              <ThemeToggler />
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
