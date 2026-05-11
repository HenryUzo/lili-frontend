import HomeSections from "../../imports/Home/Home";
import Seo from "../components/seo/Seo";

export function Home() {
  return (
    <>
      <Seo
        title="Veterinarian in San Antonio, TX | Lili Veterinary Hospital"
        description="Lili Veterinary Hospital provides compassionate, modern veterinary care for dogs and cats in San Antonio. Book an appointment or call our team today."
        path="/"
      />
      <HomeSections />
    </>
  );
}
