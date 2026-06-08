import { Link } from "react-router-dom";
import images from "../../assests/images";
import {
  CLINIC_PHONE_NUMBER,
  DIRECTIONS_URL,
  ONLINE_PHARMACY_URL,
  REVIEW_URL,
  trackCallClick,
  trackDirectionsClick,
  trackOnlinePharmacyClick,
  trackReviewClick,
} from "../../../lib/analytics";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SITE_URL,
} from "../../../lib/external-links";
import { ROUTE } from "../../../router";
import svgPaths from "../svgpath";

function handleFooterShare() {
  if (typeof window === "undefined") return;

  const shareData = {
    title: "Lili Veterinary Hospital",
    url: SITE_URL,
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => undefined);
    return;
  }

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(SITE_URL).catch(() => {
      window.open(SITE_URL, "_blank", "noopener,noreferrer");
    });
    return;
  }

  window.open(SITE_URL, "_blank", "noopener,noreferrer");
}

const socialIcons = [
  {
    label: "Share Lili Veterinary Hospital",
    path: svgPaths.p313c6040,
    viewBox: "0 0 10.5 11.6667",
    sizeClass: "h-[11.667px] w-[10.5px]",
    onClick: handleFooterShare,
  },
  {
    label: "Visit Lili Veterinary Hospital on Facebook",
    path: svgPaths.p1fd12b00,
    viewBox: "0 0 12.25 11.6667",
    sizeClass: "h-[11.667px] w-[12.25px]",
    href: FACEBOOK_URL,
  },
  {
    label: "Visit Lili Veterinary Hospital on Instagram",
    path: svgPaths.p3957770,
    viewBox: "0 0 11.6667 10.5",
    sizeClass: "h-[10.5px] w-[11.667px]",
    href: INSTAGRAM_URL,
  },
];

const quickActions = [
  {
    label: "Book Appointment",
    kind: "internal",
    to: ROUTE.bookAppointment,
  },
  {
    label: "Call Now",
    kind: "external",
    href: `tel:${CLINIC_PHONE_NUMBER}`,
    onClick: () => trackCallClick("footer"),
  },
  {
    label: "Locations",
    kind: "external",
    href: DIRECTIONS_URL,
    onClick: () => trackDirectionsClick("footer"),
  },
  {
    label: "Contact",
    kind: "internal",
    to: ROUTE.contact,
  },
  {
    label: "Online Pharmacy",
    kind: "external",
    href: ONLINE_PHARMACY_URL,
    onClick: () => trackOnlinePharmacyClick("footer"),
  },
  {
    label: "Leave a Review",
    kind: "external",
    href: REVIEW_URL,
    onClick: () => trackReviewClick("footer"),
  },
] as const;

function handleTrackedExternalLinkClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onClick?: () => void,
) {
  onClick?.();

  if (!href.startsWith("http")) return;

  event.preventDefault();
  window.setTimeout(() => {
    window.open(href, "_blank", "noopener,noreferrer");
  }, 150);
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col justify-center text-[#012d1d] text-[14px] tracking-[0.7px] uppercase w-full font-['Test_Founders_Grotesk:Medium',sans-serif] not-italic leading-[0]">
    <p className="leading-[20px]">{children}</p>
  </div>
);

const SectionText = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal text-[14px] text-[rgba(1,45,29,0.7)] w-full leading-[0]">
    <p className="leading-[20px]">{children}</p>
  </div>
);

const SocialButton = ({
  label,
  path,
  viewBox,
  sizeClass,
  href,
  onClick,
}: {
  label: string;
  path: string;
  viewBox: string;
  sizeClass: string;
  href?: string;
  onClick?: () => void;
}) => {
  const content = (
    <div className="bg-[#e7f1e2] flex items-center justify-center rounded-full size-[32px] shrink-0 transition hover:opacity-80">
      <div className={`relative shrink-0 ${sizeClass}`}>
        <svg
          className="absolute block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox={viewBox}
        >
          <path d={path} fill="var(--fill-0, #012D1D)" />
        </svg>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="shrink-0"
    >
      {content}
    </button>
  );
};

const FooterIntro = () => (
  <div className="flex flex-col gap-[22.8px] items-start pb-[67.75px]">
    <Link
      to={ROUTE.home}
      aria-label="Go to homepage"
      className="transition hover:opacity-85"
    >
      <img src={images.footerLogo} alt="Lili Veterinary Hospital" />
    </Link>

    <div className="max-w-[320px] w-full">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal text-[14px] text-[rgba(1,45,29,0.7)] leading-[22.75px]">
        <p>Crafting a legacy of health and happiness for the furry family members you love most.</p>
        <p>Join our community of pet parents today.</p>
      </div>
    </div>

    <div className="flex gap-[16px] items-start pt-[1.2px] w-full">
      {socialIcons.map((icon, index) => (
        <SocialButton
          key={index}
          label={icon.label}
          path={icon.path}
          viewBox={icon.viewBox}
          sizeClass={icon.sizeClass}
          href={icon.href}
          onClick={icon.onClick}
        />
      ))}
    </div>
  </div>
);

const FooterLinks = () => (
  <div className="flex flex-col gap-[24px] items-start pb-[84px]">
    <SectionTitle>Quick Actions</SectionTitle>

    <div className="flex flex-col gap-[12px] items-start w-full">
      {quickActions.map((item) => (
        item.kind === "internal" ? (
          <Link
            key={item.label}
            to={item.to}
            className="block w-full transition hover:opacity-80"
          >
            <SectionText>{item.label}</SectionText>
          </Link>
        ) : (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            onClick={(event) =>
              handleTrackedExternalLinkClick(event, item.href, item.onClick)
            }
            className="block w-full transition hover:opacity-80"
          >
            <SectionText>{item.label}</SectionText>
          </a>
        )
      ))}
    </div>
  </div>
);

const FooterLocation = () => (
  <div className="flex flex-col gap-[24px] items-start">
    <SectionTitle>Our Location</SectionTitle>

    <a
      href={DIRECTIONS_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="View Lili Veterinary Hospital on Google Maps"
      onClick={() => trackDirectionsClick("footer")}
      className="block h-[160px] w-full overflow-hidden rounded-[16px] shadow-[0px_20px_40px_-10px_rgba(21,30,21,0.08)] transition hover:opacity-95"
    >
      <img
        src={images.mapMoney}
        alt="Map location"
        className="w-full h-full object-cover"
      />
    </a>

    <div className="opacity-60 w-full">
      <div className="flex flex-col font-['Manrope:Regular',sans-serif] font-normal text-[#012d1d] text-[12px]">
        <p className="leading-[16px]">
          {"\u00A9"} 2024 Lili Veterinary Hospital + Urgent Care. Lovingly pinned.
        </p>
      </div>
    </div>
  </div>
);

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="grid grid-cols-1 gap-[32px] px-[24px] py-[48px] md:grid-cols-3 md:px-[48px] md:py-[64px]">
        <FooterIntro />
        <FooterLinks />
        <FooterLocation />
      </div>
    </footer>
  );
};

export default Footer;
