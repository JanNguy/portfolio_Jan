"use client";

import React from "react";

export default function PortraitSpeech() {
  return (
    <div className="portrait-speech">
      <img
        src="/Young.jpg"
        alt="Young me"
        className="portrait-speech-img"
        loading="lazy"
      />
      <p className="times-normal portrait-speech-text">
        Aussi loin que je me rappelle j'ai toujours été fasciné par l'informatique. De Pokémon Perle à Minecraft, j'ai toujours aimé chercher, bidouiller, tester, optimiser. Merci à mon père pour m'avoir depuis petit initié à ce magnifique monde.
      </p>
    </div>
  );
}
