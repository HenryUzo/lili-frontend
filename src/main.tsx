import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import AppQueryProvider from "./app/components/AppQueryProvider.tsx";
import "./styles/index.css";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { getAppointmentAttribution } from "./lib/attribution";

getAppointmentAttribution();

const root = createRoot(document.getElementById("root")!);
root.render(
  <>
    <AppQueryProvider>
      <App />
    </AppQueryProvider>
    <SpeedInsights />
  </>,
);
