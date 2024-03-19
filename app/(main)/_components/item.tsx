"use client";

import { Id } from "@/convex/_generated/dataModel";
import {
  ChevronDownCircle,
  ChevronRightCircle,
  Command,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ItemProps = {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearched?: boolean;
  level?: number;
  label: string;
  onExpand?: () => void;
  onClick?: () => void;
  icon: LucideIcon;
};

const Item = ({
  id,
  documentIcon,
  active,
  expanded,
  isSearched,
  level,
  label,
  onExpand,
  onClick,
  icon: Icon,
}: ItemProps) => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);

  const ChevronIcon = expanded ? ChevronDownCircle : ChevronRightCircle;

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const handleCreate = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) onExpand?.();
        router.push(`/documents/${documentId}`);
      }
    );

    toast.promise(promise, {
      loading: "Creating a new note",
      success: "New note created",
      error: "Failed to create a new note",
    });
  };

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    const promise = archive({ id }).then(() => {
      router.push("/documents");
    });

    toast.promise(promise, {
      loading: "Deleting...",
      success: "Moved to trash",
      error: "Failed to delete note",
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          onClick={handleExpand}
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 mr-1"
        >
          <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground"></ChevronIcon>
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2"></Icon>
      )}
      <span className="truncate">{label}</span>
      {isSearched && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-transparent px-1.5 font-mono text-[10px] font-medium text-muted-foreground ">
          <span className="text-xs">
            <Command className="h-2.5 w-2.5 mr-1"></Command>
          </span>
          K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground"></MoreHorizontal>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-60"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash2 className="h-4 w-4 mr-2"></Trash2>
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator></DropdownMenuSeparator>
              <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user?.firstName}{" "}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300"
            role="button"
            onClick={handleCreate}
          >
            <Plus className="h-4 w-4 text-muted-foreground"></Plus>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : "12px",
      }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
