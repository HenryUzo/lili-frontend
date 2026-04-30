import HomeSections from "../../imports/Home/Home";
import Seo from "../components/seo/Seo";

export function Home() {
  return (
    <>
      <Seo
        title="Lili Veterinary Hospital | Trusted Pet Care in Lagos"
        description="Lili Veterinary Hospital provides trusted veterinary care in Lagos, including wellness exams, vaccinations, urgent care, diagnostics, dental care, surgery, and appointment booking for dogs and cats."
        path="/"
      />
      <HomeSections />
    </>
  );
}
