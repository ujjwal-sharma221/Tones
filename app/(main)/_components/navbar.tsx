"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Title from "./title";
import Banner from "./banner";
import Menu from "./menu";
import Publish from "./publish";

type NavbarProps = {
  isCollapsed: boolean;
  onResetWidth: () => void;
};

const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined)
    return (
      <nav className="bg-background px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton></Menu.Skeleton>
        </div>
      </nav>
    );
  if (document === null) return null;

  return (
    <>
      <nav className="bg-background px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          ></MenuIcon>
        )}
        <div className="flex items-center w-full justify-between">
          <Title initialData={document}></Title>
          <div className="flex items-center gap-x-2">
            <Publish initialData={document}></Publish>
            <Menu documentId={document._id}></Menu>
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id}></Banner>}
    </>
  );
};

export default Navbar;
