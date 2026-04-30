import HeroBannerSection from "./banner-section/BannerSection";
import TrustSection from "./trust-section/TrustSection";
import CareFeatureSections from "./care-feature-section/CareFeatureSections";
import PetServicesMatterSection from "./pet-services-matter-section/PetServicesMatterSection";
import WellnessPlanSection from "./wellness-plan-section/WellnessPlanSection";
import FaqSection from "./faq-section/FaqSection";
import SplitRevealSlider from "../../app/reuseable-components/split-reveal-slider";
import images from "../../app/assests/images";
import HoverCursorWrapper from "../../app/reuseable-components/hover-cursor-wrapper";


export default function HomeSections() {
  return (
    <div
      className="bg-[#f1ffeb] content-stretch flex flex-col items-start relative size-full overflow-hidden"
      data-page="home"
    >
      <HeroBannerSection />
      <TrustSection />
      <CareFeatureSections />
      <PetServicesMatterSection />
      <WellnessPlanSection />
      <HoverCursorWrapper cursorImage={images.loveRed} className="w-full" >
        <SplitRevealSlider
        leftImage={images.before}
        rightImage={images.after}
        leftLabel="After"
        rightLabel="Before"
      />
      </HoverCursorWrapper>
      
      
      
      <FaqSection />
    </div>
  );
}
