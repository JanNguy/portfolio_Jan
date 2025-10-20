import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./client/App.tsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
        <Analytics />
        <SpeedInsights />
    </StrictMode>,
);
