import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

const root = createRoot(document.getElementById("root")!);
root.render(
  <>
    <App />
    <SpeedInsights />
  </>,
);
