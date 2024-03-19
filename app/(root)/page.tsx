"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Heading2 from "./_components-2/heading-2";
import Footer from "./_components/footer";
import Heading from "./_components/heading";
import Heroes from "./_components/heroes";

export default function LandingPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  const opacityY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <main ref={ref} className="min-h-full flex flex-col">
      <div className="flex flex-col flex-1 justify-center items-center md:justify-start text-center gap-y-8 p-6 pb-10">
        <motion.div style={{ y: textY, opacity: opacityY }}>
          {" "}
          <Heading></Heading>
        </motion.div>
        <motion.div style={{ y: backgroundY, opacity: opacityY }}>
          <Heroes></Heroes>
        </motion.div>
        <Heading2></Heading2>
      </div>

      <Footer></Footer>
    </main>
  );
}
