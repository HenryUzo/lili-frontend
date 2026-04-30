import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { NewPatients } from "./pages/NewPatients";
import { UrgentCare } from "./pages/UrgentCare";
import ServicesWellnessPlan from "./pages/ServicesWellnessPlan";
import ServiceVaccination from "./pages/ServiceVaccination";
import ServiceDiagnosticCare from "./pages/ServicesDiagnosticCare";
import ServicesDentalCare from "./pages/ServicesDentalCare";
import ServicesSurgery from "./pages/ServicesSurgery";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import { Toaster } from "sonner";
import { ROUTE } from "../router";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
        <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path={ROUTE.urgentCare} element={<UrgentCare />} />
      <Route path={ROUTE.wellnessPlans} element={<ServicesWellnessPlan />} />
      <Route path={ROUTE.vaccination} element={<ServiceVaccination />} />
      <Route path={ROUTE.diagnosticCare} element={<ServiceDiagnosticCare />} />
      <Route path={ROUTE.dentalCare} element={<ServicesDentalCare />} />
      <Route path={ROUTE.surgery} element={<ServicesSurgery />} />

      <Route path={ROUTE.aboutUs} element={<About />} />
      <Route path={ROUTE.bookAppointment} element={<Appointment />} />

      <Route path={ROUTE.newPatients} element={<NewPatients />} />
      <Route path={ROUTE.contact} element={<Contact />} />
    </Route>,
  ),
);

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors closeButton duration={4000} />
      <RouterProvider router={router} />
    </>
  );
}
