import images from "../../assests/images";
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
  "Book Appointment",
  "Call Now",
  "Locations",
  "Contact",
];

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
        <div key={item} className="w-full">
          <SectionText>{item}</SectionText>
        </div>
      ))}
    </div>
  </div>
);

const FooterLocation = () => (
  <div className="flex flex-col gap-[24px] items-start">
    <SectionTitle>Our Location</SectionTitle>

    <div className="h-[160px] w-full overflow-hidden rounded-[16px] shadow-[0px_20px_40px_-10px_rgba(21,30,21,0.08)]">
      <img
        src={images.mapMoney}
        alt="Map location"
        className="w-full h-full object-cover"
      />
    </div>

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