"use client";

import { useEffect, useState } from "react";
import { useI18n } from "./i18n";

function getParisTime() {
  return new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Paris",
  });
}

export default function MainFooter() {
  const [isOnline, setIsOnline] = useState(true);
  const [parisTime, setParisTime] = useState(getParisTime());
  const [isAvailable, setIsAvailable] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const updateOnline = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    const interval = setInterval(() => {
      const time = getParisTime();
      setParisTime(time);
      const hour = parseInt(time.split(":")[0], 10);
      setIsAvailable(hour >= 9 && hour < 19);
    }, 1000);
    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
      clearInterval(interval);
    };
  }, []);

  return (
    <footer className="mt-16 border-t border-zinc-800/60 pt-8 pb-8 sm:mt-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between px-4">
        <div className="space-y-2 text-sm text-zinc-500">
          <p className="font-medium text-zinc-300">Lyon, France</p>
          <p className="text-xs text-zinc-600">45.7640° N, 4.8357° E</p>
          <p className="text-xs text-zinc-600">Europe/Paris (CET/CEST)</p>
        </div>
        <div className="space-y-2 text-left text-sm sm:text-right">
          <p className="flex items-center gap-2 sm:justify-end">
            <span
              className={`inline-block h-2 w-2 rounded-full ${isAvailable ? "bg-emerald-500 shadow-emerald-500/50" : "bg-red-500/80 shadow-red-500/50"} shadow-[0_0_8px]`}
              aria-hidden
            />
            <span className={`font-medium ${isAvailable ? "text-emerald-400" : "text-zinc-400"}`}>
              {isAvailable ? t("footer.available") : t("footer.offline")}
            </span>
          </p>
          <p className="font-mono text-lg text-zinc-300">{parisTime}</p>
        </div>
      </div>
    </footer>
  );
}
