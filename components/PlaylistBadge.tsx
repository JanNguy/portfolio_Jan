
export default function PlaylistBadge() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 32,
        left: 32,
        zIndex: 50,
        borderRadius: "1.5rem",
        boxShadow: "0 8px 32px 0 #0004",
        overflow: "hidden",
        width: "min(370px, 92vw)",
        background: "rgba(24,24,24,0.82)",
        backdropFilter: "blur(12px)",
        border: "1.5px solid rgba(255,255,255,0.08)",
        padding: "1.1rem 1.2rem 1.2rem 1.2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: "0.7rem"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.2rem" }}>
        <img
          src="/X_logo_2023.svg"
          alt="Logo Playlist"
          style={{ width: 32, height: 32, borderRadius: "0.7rem", background: "#1db954", boxShadow: "0 2px 8px #1db95444" }}
        />
        <span style={{ color: "#fff", fontWeight: 600, fontSize: "1.13rem", letterSpacing: "0.01em", fontFamily: 'Inter, Arial, sans-serif' }}>
          Ma playlist
        </span>
      </div>
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: 12, minHeight: 120, width: "100%", border: 0, background: "#181818" }}
        src="https://open.spotify.com/embed/playlist/0refPTgAoFlDIZo2wTgSYR?utm_source=generator&theme=0"
        width="100%"
        height="120"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Ma playlist Spotify"
      ></iframe>
    </div>
  );
}
