"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";

import Navigation from "./_components/navigation";
import { Spinner } from "@/components/spinner";
import { SearchCommand } from "@/components/search-command";

export default function MainRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading)
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner size="lg"></Spinner>
      </div>
    );

  if (!isAuthenticated) return redirect("/");
  return (
    <div className="h-full flex">
      <Navigation></Navigation>
      <main className="flex-1 h-full overflow-y-auto">
        <SearchCommand></SearchCommand>
        {children}
      </main>
    </div>
  );
}
