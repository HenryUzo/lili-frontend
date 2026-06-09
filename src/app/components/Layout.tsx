import { Outlet } from "react-router-dom";

import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import ScrollToTop from "../../utils/ScrollToTop";
import ScrollToTopButton from "./scroll-to-top-button/ScrollToTopButton";
import SitewideStructuredData from "./seo/SitewideStructuredData";

export type NavbarPhase = "navIntro" | "ready";

export function Layout() {
  return (
    <div className="min-h-screen mx-auto w-full max-w-[1800px] bg-[#f1ffeb]">
      <SitewideStructuredData />

      <main className="size-full">
        <div className="relative flex size-full flex-col items-start bg-[#f1ffeb]">
          <Navbar phase="ready" />

          <div className="w-full">
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
