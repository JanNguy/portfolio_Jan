"use client";

import { useEffect, useState } from "react";
import { COORDINATES, LOCATION, TIMEZONE } from "@/data/site";

const TIME_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  timeZone: TIMEZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const HOUR_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIMEZONE,
  hour: "2-digit",
  hour12: false,
});

/**
 * Pied de page volontairement sans lien : la navigation vit déjà en haut de
 * page, et la répéter ici ne ferait que la paraphraser.
 */
export default function MainFooter() {
  // Rendu initial neutre : l'heure réelle n'arrive qu'après hydratation,
  // sinon le serveur et le client divergent.
  const [time, setTime] = useState("--:--");
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(TIME_FORMATTER.format(now));
      const hour = Number(HOUR_FORMATTER.format(now));
      setAvailable(hour >= 9 && hour < 19);
    };

    tick();
    const interval = window.setInterval(tick, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <footer className="mt-20 border-t border-black/10 sm:mt-28">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <p className="times-normal text-neutral-700">
            {LOCATION} · {COORDINATES}
          </p>
          <p className="times-normal text-sm text-neutral-500">{TIMEZONE} (CET/CEST)</p>
        </div>

        <div className="space-y-1.5 sm:text-right">
          <p className="flex items-center gap-2 sm:justify-end">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                available ? "bg-emerald-600" : "bg-neutral-300"
              }`}
              aria-hidden="true"
            />
            <span className="times-normal text-sm text-neutral-600">
              {available ? "Disponible (9h–19h)" : "Hors ligne"}
            </span>
          </p>
          <p className="font-mono text-sm tabular-nums text-neutral-500">{time} · Paris</p>
        </div>
      </div>

      <div className="shell pb-10">
        <p className="times-normal text-xs text-neutral-500">
          © {new Date().getFullYear()} Jan Nguyen
        </p>
      </div>
    </footer>
  );
}
