import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PhoneIcon } from "../../../imports/Home/banner-section/BannerSection";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const onScroll = () => {
      setVisible(window.scrollY > 80);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return createPortal(

    <div>
        <a
   href="tel:(210) 257-8496"
        className={`fixed bottom-24 right-8 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-[#ED1C24B2] text-white shadow-lg transition-all duration-300 ${visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
          }`}
      >
        <PhoneIcon />
      </a>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`fixed bottom-8 right-8 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-[#006838] text-white shadow-lg transition-all duration-300 ${visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
          }`}
      >
        <ArrowUp />
      </button>
    </div>,

    document.body
  );
}