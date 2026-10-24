"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BIBLIO_PLAYLIST_URL, type BiblioTrack } from "@/lib/biblio-source";
import type { CdShelfScene } from "./CdShelfScene";

const FADE_MS = 450;
const VOLUME = 0.85;

const pad = (value: number) => String(value).padStart(2, "0");

function formatDuration(ms: number) {
    const seconds = Math.round(ms / 1000);
    return `${Math.floor(seconds / 60)}:${pad(seconds % 60)}`;
}

/**
 * Bibliothèque de CD : l'étagère 3D, la fiche du disque en main et la liste
 * des titres (accessible au clavier, et repli si WebGL est indisponible).
 */
export default function CdLibrary({ tracks }: { tracks: BiblioTrack[] }) {
    const stageRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<CdShelfScene | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fadeRef = useRef(0);

    const [selected, setSelected] = useState<number | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [webgl, setWebgl] = useState<"loading" | "ready" | "failed">("loading");

    const selectedRef = useRef(selected);
    selectedRef.current = selected;

    /** Fondu de volume, puis `done` (ex. pause) une fois la cible atteinte. */
    const fade = useCallback((to: number, done?: () => void) => {
        const audio = audioRef.current;
        if (!audio) return;
        cancelAnimationFrame(fadeRef.current);
        const from = audio.volume;
        const start = performance.now();
        const step = (now: number) => {
            const t = Math.min(1, (now - start) / FADE_MS);
            audio.volume = from + (to - from) * t;
            if (t < 1) fadeRef.current = requestAnimationFrame(step);
            else done?.();
        };
        fadeRef.current = requestAnimationFrame(step);
    }, []);

    const play = useCallback(
        (index: number) => {
            const audio = audioRef.current;
            const track = tracks[index];
            if (!audio || !track?.previewUrl) return;
            if (audio.src !== track.previewUrl) {
                audio.src = track.previewUrl;
                setProgress(0);
            }
            audio.volume = 0;
            // Appelé dans le geste de l'utilisateur : le navigateur autorise la lecture.
            audio.play().then(() => fade(VOLUME)).catch(() => setPlaying(false));
        },
        [fade, tracks],
    );

    const pause = useCallback(() => {
        fade(0, () => audioRef.current?.pause());
    }, [fade]);

    const choose = useCallback(
        (index: number | null) => {
            const current = selectedRef.current;
            if (index !== null && index === current) {
                // Le disque est déjà en main : on met en pause ou on relance.
                if (audioRef.current?.paused) play(index);
                else pause();
                return;
            }
            setSelected(index);
            sceneRef.current?.setSelected(index);
            if (index === null) pause();
            else play(index);
        },
        [pause, play],
    );

    // ── Audio ──────────────────────────────────────────────────────────────
    useEffect(() => {
        const audio = new Audio();
        audio.preload = "none";
        audioRef.current = audio;

        const onPlay = () => setPlaying(true);
        const onPause = () => setPlaying(false);
        const onTime = () => setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);
        audio.addEventListener("ended", onPause);
        audio.addEventListener("timeupdate", onTime);

        return () => {
            cancelAnimationFrame(fadeRef.current);
            audio.pause();
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onPause);
            audio.removeEventListener("ended", onPause);
            audio.removeEventListener("timeupdate", onTime);
            audioRef.current = null;
        };
    }, []);

    // ── Scène 3D ───────────────────────────────────────────────────────────
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;
        let cancelled = false;
        let scene: CdShelfScene | null = null;

        (async () => {
            // Les tranches sont dessinées en canvas : les polices doivent être prêtes.
            await Promise.race([
                document.fonts.load('50px "Times New Normal"').then(() => document.fonts.ready),
                new Promise((resolve) => setTimeout(resolve, 1500)),
            ]);
            const { CdShelfScene } = await import("./CdShelfScene");
            if (cancelled) return;
            try {
                scene = new CdShelfScene(
                    stage,
                    tracks,
                    {
                        onPick: (index) => choose(index),
                        onHover: setHovered,
                        isPlaying: () => !!audioRef.current && !audioRef.current.paused,
                    },
                    tooltipRef.current,
                );
                sceneRef.current = scene;
                scene.setSelected(selectedRef.current);
                setWebgl("ready");
            } catch (error) {
                console.warn("[biblio] WebGL indisponible :", error);
                setWebgl("failed");
            }
        })();

        return () => {
            cancelled = true;
            scene?.dispose();
            sceneRef.current = null;
        };
    }, [tracks, choose]);

    // La scène relit `isPlaying` à chaque image, mais s'endort au repos.
    useEffect(() => {
        sceneRef.current?.setSelected(selected);
    }, [playing, selected]);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && selectedRef.current !== null) choose(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [choose]);

    const current = selected === null ? null : tracks[selected];
    const hoverTrack = hovered === null || hovered === selected ? null : tracks[hovered];

    return (
        <div className="shell py-14 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
                <div>
                    <h1 className="griffiths text-6xl sm:text-7xl">Biblio</h1>
                    <p className="times-normal mt-6 max-w-prose text-lg leading-relaxed text-neutral-700 text-pretty">
                        Ma playlist, rangée comme une étagère de disques. Tire un CD pour
                        écouter un extrait.
                    </p>
                </div>
                <a
                    className="times-normal text-[0.95rem] text-neutral-600 underline-offset-4 transition-colors hover:text-black hover:underline"
                    href={BIBLIO_PLAYLIST_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ouvrir dans Apple Music ↗
                </a>
            </div>

            {webgl !== "failed" && (
                <div className="cd-stage mt-10 sm:mt-12">
                    <div ref={stageRef} className="cd-stage__canvas" aria-hidden="true" />

                    {webgl === "loading" && (
                        <p className="cd-stage__loading times-normal">Mise en rayon…</p>
                    )}

                    <div
                        ref={tooltipRef}
                        className={`cd-stage__tooltip ${hoverTrack ? "is-visible" : ""}`}
                        aria-hidden="true"
                    >
                        {hoverTrack && (
                            <>
                                <span className="times-normal">{hoverTrack.title}</span>
                                <span className="cd-stage__tooltip-artist">{hoverTrack.artist}</span>
                            </>
                        )}
                    </div>

                    <div
                        className={`cd-card ${current ? "is-open" : ""}`}
                        aria-live="polite"
                        aria-hidden={!current}
                    >
                        {current && selected !== null && (
                            <>
                                <p className="eyebrow">
                                    {pad(selected + 1)} / {pad(tracks.length)}
                                </p>
                                <h2 className="griffiths mt-3 text-3xl leading-tight sm:text-4xl">
                                    {current.title}
                                </h2>
                                <p className="times-normal mt-1 text-lg text-neutral-700">
                                    {current.artist}
                                </p>
                                <p className="times-normal mt-1 text-sm text-neutral-500">
                                    {[current.album, current.year].filter(Boolean).join(" · ")}
                                </p>

                                <div className="cd-card__progress" aria-hidden="true">
                                    <span style={{ transform: `scaleX(${progress})` }} />
                                </div>

                                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                                    {current.previewUrl ? (
                                        <button
                                            type="button"
                                            className="cd-card__button"
                                            onClick={() => choose(selected)}
                                        >
                                            {playing ? "Pause" : "Écouter"}
                                        </button>
                                    ) : (
                                        <span className="times-normal text-sm text-neutral-500">
                                            Pas d&apos;extrait disponible
                                        </span>
                                    )}
                                    <a
                                        className="cd-card__link"
                                        href={current.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Apple Music ↗
                                    </a>
                                    <button
                                        type="button"
                                        className="cd-card__link"
                                        onClick={() => choose(null)}
                                    >
                                        Ranger
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <ol className="cd-list mt-12 sm:mt-14">
                {tracks.map((track, index) => (
                    <li key={track.id}>
                        <button
                            type="button"
                            className={`cd-list__row ${index === selected ? "is-active" : ""}`}
                            aria-pressed={index === selected}
                            onClick={() => {
                                choose(index);
                                if (webgl === "ready") {
                                    stageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                                }
                            }}
                        >
                            <span className="cd-list__number">{pad(index + 1)}</span>
                            <span
                                className="cd-list__swatch"
                                style={{ background: `#${track.bgColor}` }}
                                aria-hidden="true"
                            />
                            <span className="cd-list__title griffiths">{track.title}</span>
                            <span className="cd-list__artist times-normal">{track.artist}</span>
                            <span className="cd-list__duration times-normal">
                                {index === selected && playing ? "▶" : formatDuration(track.durationMs)}
                            </span>
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}
