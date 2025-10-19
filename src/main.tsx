import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./client/App.tsx";
import { SpeedInsights } from "@vercel/speed-insights/next";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
        <SpeedInsights />
    </StrictMode>,
);
