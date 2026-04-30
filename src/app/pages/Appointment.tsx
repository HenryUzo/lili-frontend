import images from "../assests/images";
import { AppointmentRequestSection } from "../components/appointment-form/AppointmentForm";
import Seo from "../components/seo/Seo";
import ServicesBanner from "../reuseable-components/services-banner";
import WhatToExpectNextSection from "../reuseable-components/what-to-expect-next-section";


const Appointment = () => {


  const handleScrollToForm = () => {
    const section = document.getElementById("appointment-request-section");
    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
    
    
    <Seo
  title="Book a Vet Appointment in Lagos | Lili Veterinary Hospital"
  description="Book a veterinary appointment at Lili Veterinary Hospital in Lagos for wellness exams, vaccinations, urgent care, dental care, diagnostics, surgery, and new patient visits."
  path="/request-appointment"
/>

  <main className="w-full">
      <ServicesBanner
        title={
          <>
            Request an Appointment <br className="hidden lg:block" />
            <span className="text-[#204E1C]">with LiliVet</span>
          </>
        }
        description={`Our team is here to provide exceptional care for your
beloved pet. Please complete the form below to begin.`}
        primaryButtonLabel="Start your request"
        secondaryActionLabel="Emergency call"
        onPrimaryClick={handleScrollToForm}
        visual={
          <div className="relative mr-[0rem] mt-[3rem]">
            <img
              src={images.dentalCareBg}
              alt="Dental Care banner"
              className="lg:scale-[112%]"
            />

            <div className="absolute right-[-2rem] top-2 hidden flex-col items-start lg:flex">
              <h1 className="font-queen rotate-[9.27deg] max-w-[278px] text-[50px] leading-[108%] tracking-[-0.03em] text-[#204E1C]">
                100% Dedicated care
              </h1>
              <img src={images.urgentBentArrow} alt="" />
            </div>
          </div>
        }
        contentClassName="lg:max-w-[562px]"
        descriptionClass="lg:max-w-[525px]"
        sectionClassName="lg:!h-[80vh]"
      />

      <AppointmentRequestSection />
      <WhatToExpectNextSection />
    </main></>
  
  );
};

export default Appointment;
