"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modals/confirm-modal";

type BannerProps = {
  documentId: Id<"documents">;
};

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId }).then(() => {});

    toast.promise(promise, {
      loading: "Deleting Note...",
      success: "Note deleted",
      error: "Note not deleted",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring Note...",
      success: "Note restored",
      error: "Note not restored",
    });
  };
  return (
    <div className="w-full bg-[#E76161] flex items-center gap-x-2 justify-center text-center text-sm p-2 text-white">
      <p>This page is Deleted!</p>
      <Button
        size="sm"
        onClick={onRestore}
        className="border-white hover:bg-[#F9FBE7] hover:text-black p-1 px-2 font-normal h-full rounded-md"
      >
        Restore Page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          className="border-white hover:bg-[#FF0303] hover:text-white p-1 px-2 font-normal h-full rounded-md"
        >
          Delete Forever
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Banner;
