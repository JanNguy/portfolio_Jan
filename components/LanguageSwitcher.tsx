"use client";

import { useState, useRef, useEffect } from "react";
import { useI18n, type Locale } from "./i18n";

export default function LanguageSwitcher() {
    const { locale, setLocale, locales, flags } = useI18n();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} style={{ position: "fixed", top: "1.5rem", right: "1.5rem", zIndex: 50 }}>
            <button
                onClick={() => setOpen((o) => !o)}
                className="times-normal"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.45rem 0.75rem",
                    borderRadius: "0.5rem",
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    color: "#444",
                    transition: "all 200ms ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
                aria-label="Change language"
            >
                <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>{flags[locale]}</span>
                <span>{locale.toUpperCase()}</span>
                <span style={{ fontSize: "0.65rem", opacity: 0.5, marginLeft: "0.1rem" }}>▼</span>
            </button>

            {open && (
                <div
                    style={{
                        position: "absolute",
                        top: "calc(100% + 0.35rem)",
                        right: 0,
                        minWidth: "7rem",
                        borderRadius: "0.5rem",
                        border: "1px solid rgba(0,0,0,0.08)",
                        background: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(16px)",
                        WebkitBackdropFilter: "blur(16px)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        overflow: "hidden",
                        animation: "langDropIn 180ms ease-out",
                    }}
                >
                    {locales.map((l: Locale) => (
                        <button
                            key={l}
                            onClick={() => {
                                setLocale(l);
                                setOpen(false);
                            }}
                            className="times-normal"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                width: "100%",
                                padding: "0.55rem 0.85rem",
                                border: "none",
                                background: l === locale ? "rgba(0,0,0,0.04)" : "transparent",
                                cursor: "pointer",
                                fontSize: "0.85rem",
                                color: l === locale ? "#000" : "#666",
                                fontWeight: l === locale ? 600 : 400,
                                transition: "background 150ms ease",
                                textAlign: "left",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.06)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background =
                                    l === locale ? "rgba(0,0,0,0.04)" : "transparent";
                            }}
                        >
                            <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>{flags[l]}</span>
                            <span>{l.toUpperCase()}</span>
                        </button>
                    ))}
                </div>
            )}

            <style jsx>{`
                @keyframes langDropIn {
                    from {
                        opacity: 0;
                        transform: translateY(-4px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
