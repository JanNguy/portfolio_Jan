export default function PortraitSpeech() {
  return (
    <div className="portrait-speech">
      <img
        src="/Young.jpg"
        alt="Jan enfant, devant un ordinateur"
        className="portrait-speech-img"
        width={1729}
        height={1226}
        // Image la plus visible au chargement de l'accueil : surtout pas en lazy.
        fetchPriority="high"
        decoding="async"
      />
      <p className="times-normal portrait-speech-text">
        Aussi loin que je me rappelle j&rsquo;ai toujours été fasciné par l&rsquo;informatique.
        De Pokémon Perle à Minecraft, j&rsquo;ai toujours aimé chercher, bidouiller, tester,
        optimiser. Merci à mon père pour m&rsquo;avoir depuis petit initié à ce magnifique monde.
      </p>
    </div>
  );
}
