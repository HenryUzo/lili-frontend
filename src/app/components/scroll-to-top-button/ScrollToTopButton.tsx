import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M21 16.92V19.92C21.0011 20.1985 20.944 20.4742 20.8322 20.7292C20.7204 20.9843 20.5564 21.2128 20.351 21.4C20.1457 21.5872 19.9027 21.7289 19.6384 21.8161C19.374 21.9032 19.0941 21.9338 18.817 21.906C15.7428 21.5725 12.789 20.5231 10.179 18.84C7.75042 17.2977 5.69146 15.2387 4.149 12.81C2.46081 10.188 1.41117 7.21953 1.083 4.13103C1.05528 3.85517 1.08558 3.57656 1.17186 3.31313C1.25814 3.0497 1.39852 2.80739 1.58419 2.60263C1.76985 2.39786 1.9967 2.23519 2.24987 2.12521C2.50304 2.01522 2.77653 1.96044 3.052 1.96403H6.052C6.53367 1.95929 7.00063 2.12809 7.36759 2.43956C7.73455 2.75103 7.97674 3.18439 8.05 3.66003C8.18659 4.69539 8.43968 5.71198 8.805 6.69003C8.93837 7.04551 8.96696 7.43193 8.88741 7.80322C8.80785 8.17452 8.6235 8.5154 8.356 8.78503L7.086 10.055C8.5098 12.5594 10.5946 14.6442 13.099 16.068L14.369 14.798C14.6386 14.5305 14.9795 14.3462 15.3508 14.2666C15.7221 14.1871 16.1085 14.2157 16.464 14.349C17.442 14.7143 18.4586 14.9674 19.494 15.104C19.9748 15.1778 20.4128 15.4244 20.7253 15.7982C21.0378 16.1719 21.2036 16.6468 21 17.132V16.92Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
        aria-label="Call Lili Veterinary Hospital"
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
