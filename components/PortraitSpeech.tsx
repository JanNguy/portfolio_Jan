"use client";

import React from "react";
import { useI18n } from "./i18n";

export default function PortraitSpeech() {
  const { t } = useI18n();

  return (
    <div className="portrait-speech">
      <img
        src="/Young.jpg"
        alt="Young me"
        className="portrait-speech-img"
        loading="lazy"
      />
      <p className="times-normal portrait-speech-text">
        {t("portrait.text")}
      </p>
    </div>
  );
}
