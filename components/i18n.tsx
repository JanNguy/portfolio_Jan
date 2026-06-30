"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type Locale = "fr" | "en" | "es" | "ja";

type Translations = Record<string, Record<Locale, string>>;

const translations: Translations = {
    // ── Homepage ──
    "home.subtitle": {
        fr: "Développeur full-stack & étudiant à Epitech Lyon passionné par le bas niveau, le web et l'intelligence artificielle.",
        en: "Full-stack developer & Epitech Lyon student — passionate about low-level programming, web and artificial intelligence.",
        es: "Desarrollador full-stack & estudiante en Epitech Lyon — apasionado por la programación de bajo nivel, la web y la inteligencia artificial.",
        ja: "フルスタック開発者 & Epitech Lyon学生 — 低レベルプログラミング、ウェブ、人工知能に情熱を注いでいます。",
    },
    "nav.projects": {
        fr: "Projects",
        en: "Projects",
        es: "Proyectos",
        ja: "プロジェクト",
    },
    "nav.contact": {
        fr: "Contact",
        en: "Contact",
        es: "Contacto",
        ja: "連絡先",
    },
    "nav.playlist": {
        fr: "Playlist",
        en: "Playlist",
        es: "Playlist",
        ja: "プレイリスト",
    },
    "nav.blog": {
        fr: "Blog",
        en: "Blog",
        es: "Blog",
        ja: "ブログ",
    },

    // ── PortraitSpeech ──
    "portrait.text": {
        fr: "Aussi loin que je me rappelle j'ai toujours été fasciné par l'informatique. De Pokémon Perle à Minecraft, j'ai toujours aimé chercher, bidouiller, tester, optimiser. Merci à mon père pour m'avoir depuis petit initié à ce magnifique monde.",
        en: "As far back as I can remember, I've always been fascinated by computers. From Pokémon Pearl to Minecraft, I've always loved exploring, tinkering, testing, optimising. Thanks to my father for introducing me to this wonderful world from a young age.",
        es: "Desde que tengo memoria, siempre me ha fascinado la informática. De Pokémon Perla a Minecraft, siempre me ha gustado explorar, experimentar, probar, optimizar. Gracias a mi padre por introducirme en este maravilloso mundo desde pequeño.",
        ja: "物心ついた頃から、コンピュータに魅了されてきました。ポケモンパールからマインクラフトまで、探求し、いじり、テストし、最適化することが大好きでした。幼い頃からこの素晴らしい世界を教えてくれた父に感謝しています。",
    },

    // ── Footer ──
    "footer.available": {
        fr: "Disponible (9h-19h)",
        en: "Available (9am-7pm)",
        es: "Disponible (9h-19h)",
        ja: "対応可能 (9時-19時)",
    },
    "footer.offline": {
        fr: "Hors ligne",
        en: "Offline",
        es: "Desconectado",
        ja: "オフライン",
    },

    // ── Contact page ──
    "contact.title": {
        fr: "Contact",
        en: "Contact",
        es: "Contacto",
        ja: "連絡先",
    },
    "contact.select": {
        fr: "Sélectionne un canal",
        en: "Select a channel",
        es: "Selecciona un canal",
        ja: "チャンネルを選択",
    },
    "contact.back": {
        fr: "Back",
        en: "Back",
        es: "Volver",
        ja: "戻る",
    },
    "contact.tap": {
        fr: "Tap an icon to see details",
        en: "Tap an icon to see details",
        es: "Toca un icono para ver detalles",
        ja: "アイコンをタップして詳細を見る",
    },

    // ── Mobile gate ──
    "mobile.gate": {
        fr: "Pour une expérience optimale, veuillez utiliser un écran plus grand.",
        en: "For the best experience, please use a larger screen.",
        es: "Para una experiencia óptima, utiliza una pantalla más grande.",
        ja: "最適な体験のために、より大きな画面をご利用ください。",
    },
    "mobile.hint": {
        fr: "Ce portfolio a été conçu pour être apprécié sur desktop.",
        en: "This portfolio was designed to be enjoyed on desktop.",
        es: "Este portafolio fue diseñado para disfrutarse en escritorio.",
        ja: "このポートフォリオはデスクトップで楽しめるように設計されています。",
    },
};

const LOCALE_LABELS: Record<Locale, string> = {
    fr: "FR",
    en: "EN",
    es: "ES",
    ja: "JA",
};

const LOCALE_FLAGS: Record<Locale, string> = {
    fr: "🇫🇷",
    en: "🇬🇧",
    es: "🇪🇸",
    ja: "🇯🇵",
};

type I18nContextType = {
    locale: Locale;
    setLocale: (l: Locale) => void;
    t: (key: string) => string;
    locales: Locale[];
    labels: Record<Locale, string>;
    flags: Record<Locale, string>;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>("fr");

    const t = useCallback(
        (key: string): string => {
            const entry = translations[key];
            if (!entry)
                return key;
            return entry[locale] ?? entry["fr"] ?? key;
        },
        [locale],
    );

    return (
        <I18nContext.Provider
            value={{
                locale,
                setLocale,
                t,
                locales: ["fr", "en", "es", "ja"],
                labels: LOCALE_LABELS,
                flags: LOCALE_FLAGS,
            }}
        >
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    const ctx = useContext(I18nContext);

    if (!ctx)
        throw new Error("useI18n must be used within I18nProvider");
    return ctx;
}
