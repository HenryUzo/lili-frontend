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
import { ROUTE } from "../../../router";
import svgPaths from "../svgpath";

const socialIcons = [
  {
    path: svgPaths.p313c6040,
    viewBox: "0 0 10.5 11.6667",
    sizeClass: "h-[11.667px] w-[10.5px]",
  },
  {
    path: svgPaths.p1fd12b00,
    viewBox: "0 0 12.25 11.6667",
    sizeClass: "h-[11.667px] w-[12.25px]",
  },
  {
    path: svgPaths.p3957770,
    viewBox: "0 0 11.6667 10.5",
    sizeClass: "h-[10.5px] w-[11.667px]",
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
  path,
  viewBox,
  sizeClass,
}: {
  path: string;
  viewBox: string;
  sizeClass: string;
}) => (
  <div className="bg-[#e7f1e2] flex items-center justify-center rounded-full size-[32px] shrink-0">
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

const FooterIntro = () => (
  <div className="flex flex-col gap-[22.8px] items-start pb-[67.75px]">
    <img src={images.footerLogo} alt="Footer Logo" />

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
          path={icon.path}
          viewBox={icon.viewBox}
          sizeClass={icon.sizeClass}
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
          © 2024 Lili Veterinary Hospital + Urgent Care. Lovingly pinned.
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
