"use client"

import { cn } from "@/lib/utils";
import { Github, Linkedin, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export function CenteredWithLogo() {
  const pages = [
    {
      title: "Privacy Policy",
      href: "#",
    },
    {
      title: "Terms",
      href: "#",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="border-t border-[#2A2A2A] px-8 py-20 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] w-full relative overflow-hidden">
      {/* Subtle Lottie-style floating animation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-10 left-1/4 w-1 h-1 bg-[#3da5f4] rounded-full opacity-20"
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-20 right-1/3 w-0.5 h-0.5 bg-[#d46aff] rounded-full opacity-25"
          animate={{
            y: [15, -15, 15],
            x: [8, -8, 8],
            opacity: [0.25, 0.6, 0.25]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-1/3 w-1 h-1 bg-[#3da5f4] rounded-full opacity-15"
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            opacity: [0.15, 0.4, 0.15]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto text-sm justify-between items-start md:px-8 relative">
        <div className="flex flex-col items-center justify-center w-full relative">
          <div className="mr-0 md:mr-4 md:flex mb-4">
            <Logo />
          </div>

          <ul className="transition-colors flex sm:flex-row flex-col text-muted-foreground list-none gap-4 mb-8">
            {pages.map((page, idx) => (
              <li key={"pages" + idx} className="list-none">
                <Link
                  className="transition-colors hover:text-[#3da5f4] text-muted-foreground"
                  href={page.href}
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>

          <GridLineHorizontal className="max-w-7xl mx-auto mt-8" />
        </div>
        <div className="flex sm:flex-row flex-col justify-between mt-8 items-center w-full">
          <p className="text-muted-foreground mb-8 sm:mb-0">
            © 2025 Piyush. All rights reserved.
          </p>
          <div className="flex gap-4 items-center">
            {/* Social icons with subtle glow halo */}
            <Link target="_blank" href="https://www.linkedin.com/in/piyush-kumar-8260b3293/" className="group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="transition-all duration-300"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(61, 165, 244, 0.3))'
                }}
              >
                <Linkedin className="h-6 w-6 text-muted-foreground group-hover:text-[#3da5f4] transition-colors duration-300" />
              </motion.div>
            </Link>
            <Link target="_blank" href="https://github.com/atpewpew" className="group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="transition-all duration-300"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(212, 106, 255, 0.3))'
                }}
              >
                <Github className="h-6 w-6 text-muted-foreground group-hover:text-[#d46aff] transition-colors duration-300" />
              </motion.div>
            </Link>
            {/* Scroll to top button with enhanced glow */}
            <motion.button
              onClick={scrollToTop}
              className="ml-4 bg-gradient-to-r from-[#3da5f4] to-[#d46aff] hover:from-[#3da5f4]/90 hover:to-[#d46aff]/90 text-white rounded-full p-2 transition-all duration-300"
              aria-label="Back to top"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(61, 165, 244, 0.4), 0 0 30px rgba(212, 106, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(61, 165, 244, 0.4))'
              }}
            >
              <ChevronUp className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#0A0A0A",
          "--color": "rgba(61, 165, 244, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(61, 165, 244, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "w-[calc(100%+var(--offset))] h-[var(--height)]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        className
      )}
    ></div>
  );
};

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm mr-4 text-foreground px-2 py-1 relative z-20 group"
    >
      <span className="font-medium text-white group-hover:text-[#3da5f4] font-[var(--font-inter)] text-xl transition-colors duration-300">
        Piyush
      </span>
    </Link>
  );
};