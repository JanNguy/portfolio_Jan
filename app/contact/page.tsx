"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type ContactEntry = {
  id: "x" | "linkedin" | "github";
  label: string;
  subtitle: string;
  href: string;
  icon: string;
  previewImage?: string;
  previewWidth?: number;
  previewHeight?: number;
  account: string;
};

const CONTACT_ENTRIES: ContactEntry[] = [
  {
    id: "x",
    label: "X",
    subtitle: "Quick notes and experiments",
    href: "https://x.com/JanNguy74478827",
    icon: "/X_logo_2023.svg",
    previewImage: "/ppTwitter$.jpg",
    previewWidth: 1200,
    previewHeight: 800,
    account: "@JanNguy74478827",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    subtitle: "Professional updates",
    href: "https://www.linkedin.com/in/jan-nguyen-0aa40b315/",
    icon: "/linkedin.svg",
    previewImage: "/PPLinekdin.jpg",
    previewWidth: 1200,
    previewHeight: 800,
    account: "Jan Nguyen",
  },
  {
    id: "github",
    label: "GitHub",
    subtitle: "Repositories and source code",
    href: "https://github.com/JanNguy",
    icon: "/github-mark.svg",
    account: "JanNguy",
  },
];

export default function ContactPage() {
  const [selected, setSelected] = useState<ContactEntry["id"]>("x");
  const [brokenPreviews, setBrokenPreviews] = useState<Record<string, boolean>>({});

  const activeId = selected;
  const activeEntry = useMemo(
    () => CONTACT_ENTRIES.find((entry) => entry.id === activeId) ?? null,
    [activeId],
  );

  return (
    <section className="grid gap-16 pt-4 sm:pt-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
      <div className="space-y-10 lg:sticky lg:top-32 lg:self-start">
        <div>
          <h1 className="text-5xl font-semibold tracking-[-0.05em] text-zinc-100 sm:text-7xl">
            Contact
          </h1>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-zinc-500">
            Select a channel
          </p>
        </div>

        <div className="flex items-center gap-4">
          {CONTACT_ENTRIES.map((entry) => {
            const isActive = entry.id === activeId;
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setSelected(entry.id)}
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition duration-300 ease-out ${
                  isActive
                    ? "border-zinc-200 bg-zinc-100 text-zinc-900"
                    : "border-zinc-700/70 bg-zinc-900/70 text-zinc-200 hover:-translate-y-0.5 hover:border-zinc-500"
                }`}
                aria-label={entry.label}
                aria-pressed={activeId === entry.id}
              >
                <Image
                  src={entry.icon}
                  alt={entry.label}
                  width={20}
                  height={20}
                  unoptimized
                  className={`h-5 w-5 object-contain ${isActive ? "opacity-90" : "opacity-75"}`}
                />
              </button>
            );
          })}
        </div>

        <div className="space-y-2 text-xs uppercase tracking-[0.15em] text-zinc-500">
          <p>
            Email
            <a className="ml-2 text-zinc-300 transition hover:text-zinc-100" href="mailto:jan.nguyen694@icloud.com">
              jan.nguyen694@icloud.com
            </a>
          </p>
          <Link className="inline-block text-zinc-400 transition hover:text-zinc-100" href="/">
            Back Home
          </Link>
        </div>
      </div>

      <div className="relative min-h-[28rem] sm:min-h-[31rem]">
        {activeEntry ? (
          <motion.a
            href={activeEntry.href}
            target="_blank"
            rel="noreferrer"
            className="group block h-full min-h-[28rem] max-w-2xl rounded-3xl border border-zinc-700/80 bg-zinc-900/70 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-zinc-500/80 sm:min-h-[31rem] sm:p-8"
            initial={false}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeEntry.id}
                initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">{activeEntry.label}</p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-zinc-100 sm:text-4xl">
                      {activeEntry.account}
                    </h2>
                    <p className="mt-3 text-sm text-zinc-400">{activeEntry.subtitle}</p>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-zinc-500 transition group-hover:text-zinc-300">
                    Open
                  </span>
                </div>

                {activeEntry.previewImage && !brokenPreviews[activeEntry.id] ? (
                  <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-700/70 bg-zinc-950/85 p-4 sm:p-5">
                    <Image
                      src={activeEntry.previewImage}
                      alt={activeEntry.label}
                      width={activeEntry.previewWidth ?? 1200}
                      height={activeEntry.previewHeight ?? 800}
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 75vw, 900px"
                      onError={() =>
                        setBrokenPreviews((current) => ({
                          ...current,
                          [activeEntry.id]: true,
                        }))
                      }
                      className="mx-auto h-auto w-auto max-h-[13rem] max-w-full rounded-xl object-contain object-center transition duration-500 group-hover:scale-[1.01] sm:max-h-[15rem]"
                    />
                  </div>
                ) : (
                  <div className="mt-6 flex min-h-[13rem] items-center rounded-2xl border border-zinc-700/70 bg-zinc-950/70 p-6 sm:min-h-[15rem]">
                    <p className="text-sm text-zinc-400">Open GitHub to explore repositories and recent work.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.a>
        ) : (
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key="contact-hint"
              className="flex h-full min-h-[28rem] max-w-2xl items-center rounded-3xl border border-zinc-800/80 bg-zinc-900/45 p-8 sm:min-h-[31rem]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm uppercase tracking-[0.17em] text-zinc-500">Tap an icon to preview and open the profile.</p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
