"use client";

import { SignOutButton, useUser } from "@clerk/clerk-react";
import { TentTree, ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const UserItem = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[150xp]">
            <Avatar className="h-5 w-5">
              <AvatarImage src={user?.imageUrl}></AvatarImage>
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user?.fullName}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 text-muted-foreground h-4 w-4"></ChevronsUpDown>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 "
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl}></AvatarImage>
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">{user?.fullName}</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem
          className="w-full cursor-pointer text-muted-foreground"
          asChild
        >
          <div>
            <SignOutButton>Log Out</SignOutButton>
            <TentTree className="w-4 h-4 ml-2"></TentTree>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
