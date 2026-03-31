"use client";

import { AnimatePresence, motion } from "framer-motion";
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

function Loader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="flex w-full max-w-3xl flex-col items-center px-8">
            <motion.p
              className="text-3xl font-semibold text-zinc-100 sm:text-5xl"
              initial={{ opacity: 0, y: 8, filter: "blur(8px)", letterSpacing: "0.12em" }}
              animate={{
                opacity: [0.72, 1, 1],
                y: [8, 0, 0],
                filter: ["blur(8px)", "blur(0px)", "blur(0px)"],
                letterSpacing: ["0.12em", "0.22em", "0.14em", "0.2em", "0.14em"],
              }}
              transition={{ duration: 2.1, times: [0, 0.2, 0.4, 0.7, 1], ease: "easeInOut" }}
            >
              Jan Nguyen
            </motion.p>

            <motion.div
              className="mt-10 h-px w-full overflow-hidden bg-zinc-800/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              <motion.span
                className="block h-full bg-zinc-300/90"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            <motion.p
              className="mt-4 text-[10px] uppercase tracking-[0.2em] text-zinc-500"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55 }}
            >
              Portfolio loading
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader visible={loading} />
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
    </>
  );
}
