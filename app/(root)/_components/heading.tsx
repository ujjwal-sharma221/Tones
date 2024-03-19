"use client";

import { ArrowRight, LogIn } from "lucide-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl">
        Your ideas, documents and plans. Unified. Welcome to{" "}
        <span className="animate-gradient text-transparent logo-font">
          Tones
        </span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Tones is the connected workspace where <br /> better work happens
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg"></Spinner>
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Tones
            <LogIn className="h-4 w-4 ml-2"></LogIn>
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Start with Tones <ArrowRight className="h-4 w-4 ml-2"></ArrowRight>
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
