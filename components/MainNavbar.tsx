"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useState, useEffect } from "react";

export default function MainNavbar() {
  const pathname = usePathname();
  // Toujours transparent
  const scrolled = false;

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={`mx-auto mt-4 flex w-[min(100%-1rem,78rem)] items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 sm:mt-4 sm:w-[min(100%-2rem,78rem)] sm:px-5 sm:py-3 border border-transparent bg-transparent text-zinc-400`}
      >
        <nav className="flex items-center gap-0.5 sm:gap-1">
          <Link
            className={`rounded-md px-2.5 py-1.5 text-xs transition-all duration-200 hover:bg-zinc-800/60 hover:text-zinc-100 sm:px-4 sm:py-2 sm:text-sm ${
              pathname === "/" ? "bg-zinc-800/80 text-white" : ""
            }`}
            href="/"
            onClick={(event) => {
              if (pathname === "/") {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            Home
          </Link>
          <Link
            className={`rounded-md px-2.5 py-1.5 text-xs transition-all duration-200 hover:bg-zinc-800/60 hover:text-zinc-100 sm:px-4 sm:py-2 sm:text-sm ${
              pathname.startsWith("/projects") ? "bg-zinc-800/80 text-white" : ""
            }`}
            href="/#projects"
          >
            Projects
          </Link>
          <Link
            className={`rounded-md px-2.5 py-1.5 text-xs transition-all duration-200 hover:bg-zinc-800/60 hover:text-zinc-100 sm:px-4 sm:py-2 sm:text-sm ${
              pathname === "/contact" ? "bg-zinc-800/80 text-white" : ""
            }`}
            href="/contact"
          >
            Contact
          </Link>
        </nav>

        <a
          className="whitespace-nowrap rounded-md bg-white px-2.5 py-1.5 text-xs text-zinc-900 shadow-sm transition-all duration-200 hover:bg-zinc-100 sm:px-4 sm:py-2 sm:text-sm"
          href="mailto:jan.nguyen694@icloud.com"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
