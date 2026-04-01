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
    <footer className="mt-24 border-t border-zinc-700/60 pt-6 text-[11px] uppercase tracking-[0.14em] text-zinc-400 sm:mt-28">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p>Position: Lyon</p>
          <p>45.7640, 4.8357</p>
          <p>Timezone: Europe/Paris (CET/CEST)</p>
        </div>

        <div className="space-y-1 text-left sm:text-right">
          <p className="flex items-center gap-2 sm:justify-end">
            Status:
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full ${isOnline ? "bg-emerald-400" : "bg-red-400"}`}
              aria-hidden
            />
            <span className={isOnline ? "text-emerald-300" : "text-red-300"}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </p>
          <p>{parisTime}</p>
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
        className={`mx-auto mt-4 flex w-[min(100%-2rem,78rem)] items-center justify-between rounded-xl px-4 py-3 text-[11px] uppercase tracking-[0.14em] transition duration-500 sm:px-5 ${
          scrolled
            ? "border border-zinc-600/60 bg-[#121212]/85 text-zinc-100 backdrop-blur-xl"
            : "border border-transparent bg-transparent text-zinc-400"
        }`}
      >
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            className="transition hover:text-zinc-100"
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
          <Link className="transition hover:text-zinc-100" href="/#projects">
            Projects
          </Link>
          <Link className="transition hover:text-zinc-100" href="/contact">
            Contact
          </Link>
        </nav>

        <a className="text-zinc-200 transition hover:text-white" href="mailto:jan.nguyen694@icloud.com">
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
      duration: 1.05,
      wheelMultiplier: 0.85,
      touchMultiplier: 0.8,
      smoothWheel: true,
      syncTouch: false,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
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
    <div className="mx-auto w-full max-w-[86rem] px-6 pb-16 pt-28 sm:px-10 md:px-14 md:pt-32 lg:px-20">
      <SiteNav />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
      <SiteFooter />
    </div>
  );
}
