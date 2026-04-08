"use client";

import { motion } from "framer-motion";
import Lenis from "lenis";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type SiteShellProps = {
  children: React.ReactNode;
};

const PARIS_TIME_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Europe/Paris",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const PARIS_HOUR_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Paris",
  hour: "2-digit",
  hour12: false,
});

function formatParisTime(date: Date): string {
  return PARIS_TIME_FORMATTER.format(date);
}

function getParisHour(date: Date): number {
  return Number(PARIS_HOUR_FORMATTER.format(date));
}

function SiteFooter() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const parisTime = useMemo(() => (now ? formatParisTime(now) : "--:--:--"), [now]);
  const isOnline = useMemo(() => {
    if (!now) {
      return false;
    }
    const hour = getParisHour(now);
    return hour >= 9 && hour < 19;
  }, [now]);

  return (
    <footer className="mt-20 border-t border-zinc-800/60 pt-8 sm:mt-24">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2 text-sm text-zinc-500">
          <p className="font-medium text-zinc-300">Lyon, France</p>
          <p className="text-xs text-zinc-600">45.7640° N, 4.8357° E</p>
          <p className="text-xs text-zinc-600">Europe/Paris (CET/CEST)</p>
        </div>

        <div className="space-y-2 text-left text-sm sm:text-right">
          <p className="flex items-center gap-2 sm:justify-end">
            <span
              className={`inline-block h-2 w-2 rounded-full ${isOnline ? "bg-emerald-500 shadow-emerald-500/50" : "bg-red-500/80 shadow-red-500/50"} shadow-[0_0_8px]`}
              aria-hidden
            />
            <span className={`font-medium ${isOnline ? "text-emerald-400" : "text-zinc-400"}`}>
              {isOnline ? "Available" : "Offline"}
            </span>
          </p>
          <p className="font-mono text-lg text-zinc-300">{parisTime}</p>
        </div>
      </div>
    </footer>
  );
}

function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={`mx-auto mt-4 flex w-[min(100%-2rem,78rem)] items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300 sm:px-5 ${
          scrolled
            ? "border border-zinc-700/50 bg-zinc-900/80 text-zinc-100 shadow-lg shadow-black/20 backdrop-blur-xl"
            : "border border-transparent bg-transparent text-zinc-400"
        }`}
      >
        <nav className="flex items-center gap-1">
          <Link
            className={`rounded-md px-4 py-2 transition-all duration-200 hover:bg-zinc-800/60 hover:text-zinc-100 ${
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
            className={`rounded-md px-4 py-2 transition-all duration-200 hover:bg-zinc-800/60 hover:text-zinc-100 ${
              pathname.startsWith("/projects") ? "bg-zinc-800/80 text-white" : ""
            }`}
            href="/#projects"
          >
            Projects
          </Link>
          <Link
            className={`rounded-md px-4 py-2 transition-all duration-200 hover:bg-zinc-800/60 hover:text-zinc-100 ${
              pathname === "/contact" ? "bg-zinc-800/80 text-white" : ""
            }`}
            href="/contact"
          >
            Contact
          </Link>
        </nav>

        <a
          className="rounded-md bg-white px-4 py-2 text-zinc-900 shadow-sm transition-all duration-200 hover:bg-zinc-100"
          href="mailto:jan.nguyen694@icloud.com"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}

export default function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      wheelMultiplier: 0.9,
      touchMultiplier: 0.85,
      smoothWheel: true,
      syncTouch: false,
      easing: (t: number) => 1 - Math.pow(1 - t, 3.5),
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[82rem] px-6 pb-20 pt-32 sm:px-8 md:px-12 lg:px-16">
      <SiteNav />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <SiteFooter />
    </div>
  );
}
