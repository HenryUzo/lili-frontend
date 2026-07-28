import React, { useEffect, useRef, useState } from "react";
import {
  NavLink as RouterNavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import PhoneCallDialog from "../../reuseable-components/call-modal";
import { ROUTE } from "../../../router";
import { trackCallClick } from "../../../lib/analytics";
import logo from "../../assests/images/logo.svg";

type NavItem = {
  text: string;
  link: string;
  exact?: boolean;
};

const MAIN_NAV_ITEMS: NavItem[] = [
  { text: "Home", link: "/", exact: true },
  { text: "Urgent Care", link: ROUTE.urgentCare },
  { text: "New Patients", link: ROUTE.newPatients },
  { text: "About", link: ROUTE.aboutUs },
  { text: "Contact", link:ROUTE.contact },
];

const SERVICE_MENU_ITEMS: NavItem[] = [
  { text: "Wellness Plans", link: ROUTE.wellnessPlans },
  { text: "Vaccination", link: ROUTE.vaccination },
  { text: "Diagnostics", link:ROUTE.diagnosticCare},
  { text: "Dental Care", link: ROUTE.dentalCare },
  { text: "Surgery", link: ROUTE.surgery },
];

const NAVBAR_BG_BY_ROUTE: Record<string, string> = {
  "/": "#D6EBAE",
  "/urgent-care": "#F2F7EE",
  "/services": "#F2F7EE",
  "/services/wellness-plans": "#F2F7EE",
  "/services/vaccination": "#F2F7EE",
  "/services/diagnostic-care": "#F2F7EE",
  "/services/dental-care": "#F2F7EE",
  "/services/surgery": "#F2F7EE",
  "/new-patients": "#F2F7EE",
  "/about-us": "#F2F7EE",
  "/contact-us": "#F2F7EE",
  "/pet-care": "#F2F7EE",
};

function isServiceRoute(pathname: string) {
  return (
    pathname === "/services" ||
    pathname === "/wellness-plans" ||
    pathname === "/services/wellness-plans" ||
    pathname.startsWith("/services/")
  );
}

function getNavbarBg(pathname: string) {
  return NAVBAR_BG_BY_ROUTE[pathname] || "#F2F7EE";
}

function StaticNavbarLogo({
  className = "w-[82.4px] h-[68.73px]",
}: {
  className?: string;
}) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <img
        src={logo}
        alt="LiliVet logo"
        className="block h-full w-full object-contain"
        draggable={false}
      />
    </div>
  );
}

function PawIndicator({
  className = "",
  active = false,
}: {
  className?: string;
  active?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none inline-flex items-center justify-center transition-all duration-300 ${
        active
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-1 scale-75 opacity-0"
      } ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
      >
        <ellipse cx="20" cy="18" rx="6" ry="8" fill="#006838" />
        <ellipse cx="33" cy="14" rx="6" ry="8" fill="#006838" />
        <ellipse cx="46" cy="18" rx="6" ry="8" fill="#006838" />
        <ellipse cx="14" cy="31" rx="6" ry="8" fill="#006838" />
        <path
          d="M32.454 28.5C22.85 28.5 15 36.106 15 45.415C15 51.925 19.62 56 25.268 56C28.869 56 30.816 54.534 32.454 52.78C34.092 54.534 36.039 56 39.64 56C45.288 56 49.908 51.925 49.908 45.415C49.908 36.106 42.058 28.5 32.454 28.5Z"
          fill="#006838"
        />
      </svg>
    </span>
  );
}

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 ${className}`}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DesktopNavItem({ text, link, exact }: NavItem) {
  const isExact = exact ?? link === "/";

  return (
    <RouterNavLink
      to={link}
      end={isExact}
      className="group relative flex items-center justify-center py-[24px]"
    >
      {({ isActive }) => (
        <div className="relative flex flex-col items-center justify-center">
          <span
            className={`font-paytone text-[16px] leading-none whitespace-nowrap transition-colors ${
              isActive
                ? "text-[#006838]"
                : "text-[#214a1e] group-hover:text-[#006838]"
            }`}
          >
            {text}
          </span>

          <PawIndicator
            active={isActive}
            className="absolute -bottom-[16px] left-1/2 -translate-x-1/2"
          />
        </div>
      )}
    </RouterNavLink>
  );
}

function ServicesDropdown() {
  const location = useLocation();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);

  const active = isServiceRoute(location.pathname);

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const closeMenu = () => {
    clearCloseTimer();

    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, 80);
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextFocusedNode = event.relatedTarget as Node | null;

    if (!wrapperRef.current?.contains(nextFocusedNode)) {
      closeMenu();
    }
  };

  useEffect(() => {
    clearCloseTimer();
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <div
      ref={wrapperRef}
      className="relative flex items-center"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocus={openMenu}
      onBlur={handleBlur}
    >
      <button
        type="button"
        className="group relative flex items-center justify-center gap-1.5 py-[24px]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span
          className={`font-paytone text-[16px] leading-none whitespace-nowrap transition-colors ${
            active || open
              ? "text-[#006838]"
              : "text-[#214a1e] group-hover:text-[#006838]"
          }`}
        >
          Services
        </span>

        <ChevronDownIcon
          className={`mt-[3px] transition-all duration-300 ${
            active || open ? "text-[#006838]" : "text-[#214a1e]"
          } ${open ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      <div
        className={`absolute left-1/2 top-full z-[120] mt-[-1.5rem] w-[170px] -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-[0.96] opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.14)] ring-1 ring-black/5">
          {SERVICE_MENU_ITEMS.map((item, index) => (
            <RouterNavLink
              key={item.link}
              to={item.link}
              end={item.exact ?? item.link === "/"}
              className={({ isActive }) =>
                `flex h-[47px] items-center justify-center border-b border-[#EAEAEA] px-4 text-center font-paytone text-[13px] leading-none transition-all duration-200 last:border-b-0 ${
                  isActive
                    ? "bg-[#F6FAF3] text-[#006838]"
                    : "text-[#214a1e] hover:bg-[#F8F8F8]"
                } ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`
              }
            >
              {item.text}
            </RouterNavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

function BookAppointment({ full = false }: { full?: boolean }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate("/book-appointment")}
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-[36px] bg-[#006838] p-[16px] transition-colors hover:bg-[#005028] ${
        full ? "w-full" : ""
      }`}
    >
      <span className="font-paytone text-[16px] leading-none whitespace-nowrap text-white">
        Book Appointment
      </span>
    </button>
  );
}

function CallNow({ full = false }: { full?: boolean }) {
  return (
    <a
      href="tel:(210) 257-8496"
      onClick={() => trackCallClick("header")}
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-[36px] bg-[rgba(255,255,255,0.84)] p-[16px] transition-colors hover:bg-white ${
        full ? "w-full" : ""
      }`}
    >
      <span className="font-paytone text-[16px] leading-none whitespace-nowrap text-[red]">
        Call now
      </span>
    </a>
  );
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="flex h-[28px] w-[28px] cursor-pointer flex-col items-center justify-center gap-[5px]">
      <span
        className={`block h-[2px] w-full origin-center bg-[#214a1e] transition-all duration-300 ${
          isOpen ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`block h-[2px] w-full bg-[#214a1e] transition-all duration-300 ${
          isOpen ? "scale-x-0 opacity-0" : ""
        }`}
      />
      <span
        className={`block h-[2px] w-full origin-center bg-[#214a1e] transition-all duration-300 ${
          isOpen ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navbarBg = getNavbarBg(location.pathname);

  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(
    isServiceRoute(location.pathname),
  );

  const closeMenu = () => setOffcanvasOpen(false);
  const mobileServicesActive = isServiceRoute(location.pathname);

  useEffect(() => {
    document.body.style.overflow = offcanvasOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [offcanvasOpen]);

  useEffect(() => {
    closeMenu();
    setMobileServicesOpen(isServiceRoute(location.pathname));
  }, [location.pathname]);

  return (
    <>
      <div
        className="relative z-[100000] w-full shrink-0 transition-colors duration-500"
        style={{ backgroundColor: navbarBg }}
      >
        <div className="flex items-center justify-between px-[24px] py-[16px] md:px-[64px] md:py-[24px]">
          <div className="relative h-[68.73px] w-[82.4px] shrink-0">
            <StaticNavbarLogo className="h-full w-full" />
          </div>

          <div
            className="hidden items-center gap-[24px] xl:flex"
          >
            {MAIN_NAV_ITEMS.slice(0, 2).map((item) => (
              <DesktopNavItem key={item.link} {...item} />
            ))}

            <ServicesDropdown />

            {MAIN_NAV_ITEMS.slice(2).map((item) => (
              <DesktopNavItem key={item.link} {...item} />
            ))}

            <BookAppointment />
            <PhoneCallDialog
              location="header"
              trigger={
                <button
                  type="button"
                  className={`flex shrink-0 items-center justify-center overflow-hidden rounded-[36px] bg-[rgba(255,255,255,0.84)] p-[16px] transition-colors hover:bg-white `}
                >
                  <span className="font-paytone text-[16px] leading-none whitespace-nowrap text-[red]">
                    Call now
                  </span>
                </button>
              }
            />
          </div>

          <div
            className="hidden items-center gap-[12px] md:flex xl:hidden"
          >
            <BookAppointment />
            <CallNow />

            <button
              className="ml-2 p-2"
              onClick={() => setOffcanvasOpen(true)}
              aria-label="Open menu"
              type="button"
            >
              <HamburgerIcon isOpen={false} />
            </button>
          </div>

          <button
            className="flex p-2 md:hidden"
            onClick={() => setOffcanvasOpen(true)}
            aria-label="Open menu"
            type="button"
          >
            <HamburgerIcon isOpen={false} />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 xl:hidden ${
          offcanvasOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      <div
        className={`fixed right-0 top-0 z-[1000000] flex h-full w-[300px] flex-col bg-[#d6ebae] shadow-2xl transition-transform duration-300 ease-in-out xl:hidden ${
          offcanvasOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#b5d87a] px-[24px] py-[20px]">
          <StaticNavbarLogo className="h-[68.73px] w-[82.4px]" />

          <button
            className="rounded-full p-2 transition-colors hover:bg-[#c4e080]"
            onClick={closeMenu}
            aria-label="Close menu"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 4L16 16M16 4L4 16"
                stroke="#214a1e"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto py-[8px]">
          {MAIN_NAV_ITEMS.slice(0, 2).map((item) => (
            <RouterNavLink
              key={item.link}
              to={item.link}
              end={item.exact ?? item.link === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-between border-b border-[#b5d87a]/50 px-[28px] py-[16px] font-paytone text-[16px] transition-colors last:border-b-0 ${
                  isActive
                    ? "bg-[#c4e080] text-[#006838]"
                    : "text-[#214a1e] hover:bg-[#c4e080]"
                }`
              }
            >
              <span>{item.text}</span>
            </RouterNavLink>
          ))}

          <div className="border-b border-[#b5d87a]/50">
            <button
              type="button"
              onClick={() => setMobileServicesOpen((prev) => !prev)}
              className={`flex w-full items-center justify-between px-[28px] py-[16px] font-paytone text-[16px] transition-colors ${
                mobileServicesActive || mobileServicesOpen
                  ? "bg-[#c4e080] text-[#006838]"
                  : "text-[#214a1e] hover:bg-[#c4e080]"
              }`}
            >
              <span>Services</span>

              <ChevronDownIcon
                className={`transition-transform duration-300 ${
                  mobileServicesOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                mobileServicesOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-100"
              }`}
            >
              <div className="overflow-hidden bg-[#cfe59f]">
                {SERVICE_MENU_ITEMS.map((item) => (
                  <RouterNavLink
                    key={item.link}
                    to={item.link}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-t border-[#b5d87a]/50 py-[14px] pl-[44px] pr-[28px] font-paytone text-[14px] transition-colors ${
                        isActive
                          ? "bg-[#bddc78] text-[#006838]"
                          : "text-[#214a1e] hover:bg-[#bddc78]"
                      }`
                    }
                  >
                    <span>{item.text}</span>
                  </RouterNavLink>
                ))}
              </div>
            </div>
          </div>

          {MAIN_NAV_ITEMS.slice(2).map((item) => (
            <RouterNavLink
              key={item.link}
              to={item.link}
              end={item.exact ?? item.link === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center justify-between border-b border-[#b5d87a]/50 px-[28px] py-[16px] font-paytone text-[16px] transition-colors last:border-b-0 ${
                  isActive
                    ? "bg-[#c4e080] text-[#006838]"
                    : "text-[#214a1e] hover:bg-[#c4e080]"
                }`
              }
            >
              <span>{item.text}</span>
            </RouterNavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-[12px] border-t border-[#b5d87a] px-[24px] py-[28px]">
          <BookAppointment full />
          <CallNow full />
        </div>
      </div>

    </>
  );
}
