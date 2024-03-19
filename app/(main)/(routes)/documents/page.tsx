"use client";

import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentPage = () => {
  const create = useMutation(api.documents.create);
  const { user } = useUser();
  const router = useRouter();

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) => {
      router.push(`/documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating a new note",
      success: "New note created",
      error: "Failed to create a new note",
    });
  };

  return (
    <div className="h-full flex flex-col justify-center items-center space-y-4">
      <Image
        src="/images/top-peek.png"
        alt="top-peek"
        height="200"
        width="200"
        className=""
      ></Image>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2"></PlusCircle>
        Create
      </Button>
    </div>
  );
};

export default DocumentPage;
