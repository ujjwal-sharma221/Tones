"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    // @ts-ignore
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  });

  const scrolled = useScrollTop();

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      animate={hidden ? "hidden" : "visible"}
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div className="text-4xl">
        <Logo></Logo>
      </div>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Start with Tones</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/documents">Enter Tones</Link>
            </Button>
            <UserButton afterSignOutUrl="/"></UserButton>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
