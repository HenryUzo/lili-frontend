import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar, { NavbarPhase } from "./app/components/navbar/Navbar";
import AppLoader from "./app/AppLoader";
import images from "./app/assests/images";



type AppPhase = "bootloading" | "navIntro" | "ready";

const MIN_BOOT_TIME = 1400;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    if (!src) {
      resolve();
      return;
    }

    const img = new Image();

    const done = () => {
      img.onload = null;
      img.onerror = null;
      resolve();
    };

    img.onload = done;
    img.onerror = done;
    img.src = src;

    if (img.complete) {
      done();
    }
  });
}

async function preloadAssets(
  urls: string[],
  onProgress?: (loaded: number, total: number) => void,
) {
  const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
  const total = uniqueUrls.length;

  if (!total) {
    onProgress?.(1, 1);
    return;
  }

  let loaded = 0;

  await Promise.all(
    uniqueUrls.map(async (src) => {
      await preloadImage(src);
      loaded += 1;
      onProgress?.(loaded, total);
    }),
  );
}

function getNavigationType() {
  if (typeof window === "undefined") return "navigate";

  const navEntries = performance.getEntriesByType(
    "navigation",
  ) as PerformanceNavigationTiming[];

  return navEntries[0]?.type ?? "navigate";
}

function getCriticalAssets(pathname: string) {
  const globalAssets = [images.logo, images.whitePawPrint];

  const homeAssets = [
    // add your actual first-screen home assets here
    // images.heroBg,
    // images.heroDog,
    // images.heroPattern,
  ];

  switch (pathname) {
    case "/":
      return [...globalAssets, ...homeAssets];
    default:
      return globalAssets;
  }
}

export default function AppWrapper() {
  const location = useLocation();
  const [phase, setPhase] = useState<AppPhase>("bootloading");
  const [progress, setProgress] = useState(0);

  const criticalAssets = useMemo(
    () => getCriticalAssets(location.pathname),
    [location.pathname],
  );

  useEffect(() => {
    const navType = getNavigationType();
    const shouldShowBootLoader = navType === "reload";

    if (!shouldShowBootLoader) {
      setPhase("ready");
      setProgress(100);
      return;
    }

    let cancelled = false;

    const run = async () => {
      setPhase("bootloading");
      setProgress(0);

      await Promise.all([
        preloadAssets(criticalAssets, (loaded, total) => {
          if (!cancelled) {
            setProgress((loaded / total) * 100);
          }
        }),
        delay(MIN_BOOT_TIME),
      ]);

      if (!cancelled) {
        setProgress(100);
        setPhase("navIntro");
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [criticalAssets]);

  const navbarPhase: NavbarPhase =
    phase === "navIntro" ? "navIntro" : "ready";

  return (
    <>
      {phase === "bootloading" && <AppLoader progress={progress} />}

      <Navbar
        phase={navbarPhase}
        onIntroComplete={() => setPhase("ready")}
      />

      <div
        style={{
          pointerEvents: phase === "ready" ? "auto" : "none",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}