"use client";

import Link from "next/link";
import { CreativeCommons } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ThemeToggler } from "@/components/common";
import {
  LogOut,
  BadgePlus,
  UserRound,
  LogIn,
  UserRoundPlus,
  AlignJustify,
} from "lucide-react";
import { logout as setLogout } from "@/redux/features/authSlice";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  useLogoutMutation,
  useRetrieveUserQuery,
} from "@/redux/features/authApiSlice";

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
    <div className="text-black px-5 mt-4 flex justify-between">
      {isAuthenticated ? (
        <Link href="/dashboard">
          <CreativeCommons className="dark:text-white" />
        </Link>
      ) : (
        <Link href="/">
          <CreativeCommons className="dark:text-white" />
        </Link>
      )}

      <div className="flex item-center">
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
                <Link href="/" className="flex justify-between">
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
              <AlignJustify className="h-[1.2rem] w-[1.2rem]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="/dashboard/create/account"
                  className="flex justify-between"
                >
                  <UserRoundPlus className="h-[1.2rem] w-[1.2rem]" />
                  <span className="ml-2">Sign Up</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/" className="flex justify-between">
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
