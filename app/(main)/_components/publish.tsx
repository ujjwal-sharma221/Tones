"use client";

import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, CopyPlus, Globe2 } from "lucide-react";

import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { api } from "@/convex/_generated/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

type PublishProps = {
  initialData: Doc<"documents">;
};

const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const url = `${origin}/${initialData._id}`;

  const onPublish = () => {
    setSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Published!",
      error: "Failed to publish",
    });
  };

  const onUnPublish = () => {
    setSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setSubmitting(false));

    toast.promise(promise, {
      loading: "UnPublishing...",
      success: "UnPublished!",
      error: "Failed to Un-publish",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          Publish
          {initialData.isPublished && (
            <Globe2 className="w-4 h-4 ml-2 text-[#D04848]"></Globe2>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe2 className="animate-pulse h-4 w-4 text-[#D04848]"></Globe2>
              <p className="text-xs font-medium text-[#D04848]">
                This note is live on web
              </p>
            </div>
            <div className="flex items-center">
              <input
                value={url}
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                disabled
              ></input>
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none bg-[#352F44]"
              >
                {copied ? (
                  <BadgeCheck className="h-4 w-4"></BadgeCheck>
                ) : (
                  <CopyPlus className="h-4 w-4"></CopyPlus>
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={submitting}
              onClick={onUnPublish}
            >
              UnPublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe2 className="h-8 w-8 text-muted-foreground mb-2"></Globe2>
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your work with others
            </span>
            <Button
              disabled={submitting}
              onClick={onPublish}
              className="w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
