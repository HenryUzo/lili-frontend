// import { useEffect, useRef, useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";

// import Navbar, { NavbarPhase } from "./navbar/Navbar";
// import Footer from "./footer/Footer";
// import AppLoader from "../AppLoader";
// import images from "../assests/images";

// type AppPhase = "bootloading" | "navIntro" | "ready";

// const MIN_BOOT_TIME = 1400;

// function delay(ms: number) {
//   return new Promise<void>((resolve) => {
//     window.setTimeout(resolve, ms);
//   });
// }

// function preloadImage(src: string) {
//   return new Promise<void>((resolve) => {
//     if (!src) {
//       resolve();
//       return;
//     }

//     const img = new Image();

//     const done = () => {
//       img.onload = null;
//       img.onerror = null;
//       resolve();
//     };

//     img.onload = done;
//     img.onerror = done;
//     img.src = src;

//     if (img.complete) {
//       done();
//     }
//   });
// }

// async function preloadAssets(
//   urls: string[],
//   onProgress?: (loaded: number, total: number) => void,
// ) {
//   const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
//   const total = uniqueUrls.length;

//   if (!total) {
//     onProgress?.(1, 1);
//     return;
//   }

//   let loaded = 0;

//   await Promise.all(
//     uniqueUrls.map(async (src) => {
//       await preloadImage(src);
//       loaded += 1;
//       onProgress?.(loaded, total);
//     }),
//   );
// }

// function getNavigationType() {
//   if (typeof window === "undefined") return "navigate";

//   const navEntries = performance.getEntriesByType(
//     "navigation",
//   ) as PerformanceNavigationTiming[];

//   return navEntries[0]?.type ?? "navigate";
// }

// function getCriticalAssets(pathname: string) {
//   const globalAssets = [images.logo, images.whitePawPrint];

//   const homeAssets = [images.catandDog];

//   const urgentCareAssets: string[] = [];
//   const newPatientsAssets: string[] = [];

//   switch (pathname) {
//     case "/":
//       return [...globalAssets, ...homeAssets];
//     case "/urgent-care":
//       return [...globalAssets, ...urgentCareAssets];
//     case "/new-patients":
//       return [...globalAssets, ...newPatientsAssets];
//     default:
//       return globalAssets;
//   }
// }

// export function Layout() {
//   const location = useLocation();

//   const initialNavTypeRef = useRef(getNavigationType());
//   const initialPathnameRef = useRef(location.pathname);
//   const hasBootRunRef = useRef(false);

//   const shouldShowBootLoader = initialNavTypeRef.current === "reload";
//   const initialAssetsRef = useRef(
//     getCriticalAssets(initialPathnameRef.current),
//   );

//   const [phase, setPhase] = useState<AppPhase>(
//     shouldShowBootLoader ? "bootloading" : "ready",
//   );
//   const [progress, setProgress] = useState(shouldShowBootLoader ? 0 : 100);

//   useEffect(() => {
//     if (!shouldShowBootLoader) return;
//     if (hasBootRunRef.current) return;

//     hasBootRunRef.current = true;

//     let cancelled = false;

//     const run = async () => {
//       setPhase("bootloading");
//       setProgress(0);

//       await Promise.all([
//         preloadAssets(initialAssetsRef.current, (loaded, total) => {
//           if (!cancelled) {
//             setProgress((loaded / total) * 100);
//           }
//         }),
//         delay(MIN_BOOT_TIME),
//       ]);

//       if (!cancelled) {
//         setProgress(100);
//         setPhase("navIntro");
//       }
//     };

//     run();

//     return () => {
//       cancelled = true;
//     };
//   }, [shouldShowBootLoader]);

//   const navbarPhase: NavbarPhase = phase === "navIntro" ? "navIntro" : "ready";

//   return (
//     <div className="min-h-screen mx-auto w-full max-w-[1800px] bg-[#f1ffeb]">
//       {phase === "bootloading" && <AppLoader progress={progress} />}

//       <main className="size-full">
//         <div className="relative flex size-full flex-col items-start bg-[#f1ffeb]">
//           {phase !== "bootloading" && (
//             <Navbar
//               phase={navbarPhase}
//               onIntroComplete={() => setPhase("ready")}
//             />
//           )}

//           <div
//             className="w-full"
//             style={{
//               pointerEvents: phase === "ready" ? "auto" : "none",
//             }}
//           >
//             <Outlet />
//             <Footer />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
// import { useEffect, useRef, useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";

// import Navbar, { NavbarPhase } from "./navbar/Navbar";
// import Footer from "./footer/Footer";
// import AppLoader from "../AppLoader";
// import images from "../assests/images";
// import videos from "../assests/videos";
// // import videos from "../assests/videos"; // if you have a videos file

// type AppPhase = "bootloading" | "navIntro" | "ready";

// const MIN_BOOT_TIME = 1400;

// function delay(ms: number) {
//   return new Promise<void>((resolve) => {
//     window.setTimeout(resolve, ms);
//   });
// }

// function isVideo(src: string) {
//   return /\.(mp4|webm|ogg|mov)$/i.test(src);
// }

// function preloadImage(src: string) {
//   return new Promise<void>((resolve) => {
//     if (!src) {
//       resolve();
//       return;
//     }

//     const img = new Image();

//     const done = () => {
//       img.onload = null;
//       img.onerror = null;
//       resolve();
//     };

//     img.onload = done;
//     img.onerror = done;
//     img.src = src;

//     if (img.complete) {
//       done();
//     }
//   });
// }

// function preloadVideo(src: string) {
//   return new Promise<void>((resolve) => {
//     if (!src) {
//       resolve();
//       return;
//     }

//     const video = document.createElement("video");

//     const done = () => {
//       video.onloadeddata = null;
//       video.onloadedmetadata = null;
//       video.onerror = null;
//       video.src = "";
//       video.load();
//       resolve();
//     };

//     // metadata is lighter; loadeddata is safer if you want first frame available
//     video.preload = "metadata";
//     video.onloadedmetadata = done;
//     video.onloadeddata = done;
//     video.onerror = done;
//     video.src = src;
//     video.load();
//   });
// }

// function preloadAsset(src: string) {
//   if (isVideo(src)) {
//     return preloadVideo(src);
//   }

//   return preloadImage(src);
// }

// async function preloadAssets(
//   urls: string[],
//   onProgress?: (loaded: number, total: number) => void,
// ) {
//   const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
//   const total = uniqueUrls.length;

//   if (!total) {
//     onProgress?.(1, 1);
//     return;
//   }

//   let loaded = 0;

//   await Promise.all(
//     uniqueUrls.map(async (src) => {
//       await preloadAsset(src);
//       loaded += 1;
//       onProgress?.(loaded, total);
//     }),
//   );
// }

// function getNavigationType() {
//   if (typeof window === "undefined") return "navigate";

//   const navEntries = performance.getEntriesByType(
//     "navigation",
//   ) as PerformanceNavigationTiming[];

//   return navEntries[0]?.type ?? "navigate";
// }

// function getCriticalAssets(pathname: string) {
//   const globalAssets = [images.logo, images.whitePawPrint];

//   const homeAssets = [
//     images.catandDog,
//     videos.bigVideo,
//   ];

//   const urgentCareAssets: string[] = [
//     // videos.urgentCareHeroVideo,
//   ];

//   const newPatientsAssets: string[] = [];

//   switch (pathname) {
//     case "/":
//       return [...globalAssets, ...homeAssets];
//     case "/urgent-care":
//       return [...globalAssets, ...urgentCareAssets];
//     case "/new-patients":
//       return [...globalAssets, ...newPatientsAssets];
//     default:
//       return globalAssets;
//   }
// }

// export function Layout() {
//   const location = useLocation();

//   const initialNavTypeRef = useRef(getNavigationType());
//   const initialPathnameRef = useRef(location.pathname);
//   const hasBootRunRef = useRef(false);

//   const shouldShowBootLoader = initialNavTypeRef.current === "reload";
//   const initialAssetsRef = useRef(
//     getCriticalAssets(initialPathnameRef.current),
//   );

//   const [phase, setPhase] = useState<AppPhase>(
//     shouldShowBootLoader ? "bootloading" : "ready",
//   );
//   const [progress, setProgress] = useState(shouldShowBootLoader ? 0 : 100);

//   useEffect(() => {
//     if (!shouldShowBootLoader) return;
//     if (hasBootRunRef.current) return;

//     hasBootRunRef.current = true;

//     let cancelled = false;

//     const run = async () => {
//       setPhase("bootloading");
//       setProgress(0);

//       await Promise.all([
//         preloadAssets(initialAssetsRef.current, (loaded, total) => {
//           if (!cancelled) {
//             setProgress((loaded / total) * 100);
//           }
//         }),
//         delay(MIN_BOOT_TIME),
//       ]);

//       if (!cancelled) {
//         setProgress(100);
//         setPhase("navIntro");
//       }
//     };

//     run();

//     return () => {
//       cancelled = true;
//     };
//   }, [shouldShowBootLoader]);

//   const navbarPhase: NavbarPhase = phase === "navIntro" ? "navIntro" : "ready";

//   return (
//     <div className="min-h-screen mx-auto w-full max-w-[1800px] bg-[#f1ffeb]">
//       {phase === "bootloading" && <AppLoader progress={progress} />}

//       <main className="size-full">
//         <div className="relative flex size-full flex-col items-start bg-[#f1ffeb]">
//           {phase !== "bootloading" && (
//             <Navbar
//               phase={navbarPhase}
//               onIntroComplete={() => setPhase("ready")}
//             />
//           )}

//           <div
//             className="w-full"
//             style={{
//               pointerEvents: phase === "ready" ? "auto" : "none",
//             }}
//           >
//             <Outlet />
//             <Footer />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Navbar, { NavbarPhase } from "./navbar/Navbar";
import Footer from "./footer/Footer";
import AppLoader from "../AppLoader";
import images from "../assests/images";
import videos from "../assests/videos";
import ScrollToTop from "../../utils/ScrollToTop";
import ScrollToTopButton from "./scroll-to-top-button/ScrollToTopButton";

type AppPhase = "bootloading" | "navIntro" | "ready";

const MIN_BOOT_TIME = 1400;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function isVideo(src: string) {
  return /\.(mp4|webm|ogg|mov)$/i.test(src);
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

    if (img.complete) done();
  });
}

function preloadVideo(src: string) {
  return new Promise<void>((resolve) => {
    if (!src) {
      resolve();
      return;
    }

    const video = document.createElement("video");

    const done = () => {
      video.onloadedmetadata = null;
      video.onloadeddata = null;
      video.onerror = null;
      video.src = "";
      video.load();
      resolve();
    };

    video.preload = "metadata";
    video.onloadedmetadata = done;
    video.onloadeddata = done;
    video.onerror = done;
    video.src = src;
    video.load();
  });
}

function preloadAsset(src: string) {
  return isVideo(src) ? preloadVideo(src) : preloadImage(src);
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
      await preloadAsset(src);
      loaded += 1;
      onProgress?.(loaded, total);
    }),
  );
}

function getNavigationType(): PerformanceNavigationTiming["type"] | "navigate" {
  if (typeof window === "undefined") return "navigate";

  const navEntries = performance.getEntriesByType(
    "navigation",
  ) as PerformanceNavigationTiming[];

  return navEntries[0]?.type ?? "navigate";
}

function shouldRunBootLoader(navType: string) {
  return navType === "navigate" || navType === "reload";
}

function getCriticalAssets(pathname: string) {
  const globalAssets = [
    images.logo,
    images.whitePawPrint,
    videos.bigVideo,
    images.cuteCatAndDog,
  ];
  const homeAssets = [images.catandDog, videos.bigVideo];

  const urgentCareAssets: string[] = [];
  const newPatientsAssets: string[] = [];

  switch (pathname) {
    case "/":
      return [...globalAssets, ...homeAssets];
    case "/urgent-care":
      return [...globalAssets, ...urgentCareAssets];
    case "/new-patients":
      return [...globalAssets, ...newPatientsAssets];
    default:
      return globalAssets;
  }
}

export function Layout() {
  const location = useLocation();

  const initialNavTypeRef = useRef(getNavigationType());
  const initialPathnameRef = useRef(location.pathname);
  const hasBootRunRef = useRef(false);

  const shouldShowBootLoader = shouldRunBootLoader(initialNavTypeRef.current);
  const initialAssetsRef = useRef(
    getCriticalAssets(initialPathnameRef.current),
  );

  const [phase, setPhase] = useState<AppPhase>(
    shouldShowBootLoader ? "bootloading" : "ready",
  );
  const [progress, setProgress] = useState(shouldShowBootLoader ? 0 : 100);

  useEffect(() => {
    if (!shouldShowBootLoader) return;
    if (hasBootRunRef.current) return;

    hasBootRunRef.current = true;

    let cancelled = false;

    const run = async () => {
      setPhase("bootloading");
      setProgress(0);

      await Promise.all([
        preloadAssets(initialAssetsRef.current, (loaded, total) => {
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
  }, [shouldShowBootLoader]);

  const navbarPhase: NavbarPhase = phase === "navIntro" ? "navIntro" : "ready";

  return (
    <div className="min-h-screen mx-auto w-full max-w-[1800px] bg-[#f1ffeb]">
      {phase === "bootloading" && <AppLoader progress={progress} />}

      <main className="size-full">
        <div className="relative flex size-full flex-col items-start bg-[#f1ffeb]">
          {phase !== "bootloading" && (
            <Navbar
              phase={navbarPhase}
              onIntroComplete={() => setPhase("ready")}
            />
          )}

          <div
            className="w-full"
            style={{
              pointerEvents: phase === "ready" ? "auto" : "none",
              visibility: phase === "bootloading" ? "hidden" : "visible",
            }}
          >
            <ScrollToTop />
            <ScrollToTopButton />
            <Outlet />
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}
