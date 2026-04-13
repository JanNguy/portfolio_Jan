"use client";

import { useState, useEffect } from "react";
import { useI18n } from "./i18n";
import LanguageSwitcher from "./LanguageSwitcher";

const BREAKPOINT = 900;

export default function MobileGate({ children }: { children: React.ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { t } = useI18n();

    useEffect(() => {
        setMounted(true);
        const check = () => setIsMobile(window.innerWidth <= BREAKPOINT);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Avoid hydration mismatch — render nothing until mounted
    if (!mounted) return null;

    if (isMobile) {
        return (
            <div className="mobile-gate">
                <LanguageSwitcher />
                <div className="mobile-gate-content">
                    <p className="griffiths mobile-gate-name">Jan Nguyen</p>
                    <p className="times-normal mobile-gate-message">
                        {t("mobile.gate")}
                    </p>
                    <p className="times-normal mobile-gate-hint">
                        {t("mobile.hint")}
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
