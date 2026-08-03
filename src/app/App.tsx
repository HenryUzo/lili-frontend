import { Suspense, lazy, type ReactNode } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { Toaster } from "sonner";
import { ROUTE } from "../router";
const Home = lazy(() =>
  import("./pages/Home").then((module) => ({ default: module.Home })),
);
const About = lazy(() =>
  import("./pages/About").then((module) => ({ default: module.About })),
);
const NewPatients = lazy(() =>
  import("./pages/NewPatients").then((module) => ({
    default: module.NewPatients,
  })),
);
const UrgentCare = lazy(() =>
  import("./pages/UrgentCare").then((module) => ({
    default: module.UrgentCare,
  })),
);
const ServicesWellnessPlan = lazy(() => import("./pages/ServicesWellnessPlan"));
const ServiceVaccination = lazy(() => import("./pages/ServiceVaccination"));
const ServiceDiagnosticCare = lazy(() => import("./pages/ServicesDiagnosticCare"));
const ServicesDentalCare = lazy(() => import("./pages/ServicesDentalCare"));
const ServicesSurgery = lazy(() => import("./pages/ServicesSurgery"));
const Appointment = lazy(() => import("./pages/Appointment"));
const AppointmentReschedule = lazy(() => import("./pages/AppointmentReschedule"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PetCareLibrary = lazy(() =>
  import("./pages/pet-care/PetCareLibrary").then((module) => ({
    default: module.PetCareLibrary,
  })),
);
const PetCareCategory = lazy(() =>
  import("./pages/pet-care/PetCareCategory").then((module) => ({
    default: module.PetCareCategory,
  })),
);
const PetCareArticle = lazy(() =>
  import("./pages/pet-care/PetCareArticle").then((module) => ({
    default: module.PetCareArticle,
  })),
);
const PetCarePreview = lazy(() =>
  import("./pages/pet-care/PetCarePreview").then((module) => ({ default: module.PetCarePreview })),
);
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));

function RouteFallback() {
  return (
    <div className="min-h-[40vh] w-full bg-[#F2F7EE]" aria-hidden="true" />
  );
}

function withSuspense(element: ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="*" element={withSuspense(<NotFound />)} />
      <Route path="/" element={withSuspense(<Home />)} />
      <Route path={ROUTE.urgentCare} element={withSuspense(<UrgentCare />)} />
      <Route
        path={ROUTE.wellnessPlans}
        element={withSuspense(<ServicesWellnessPlan />)}
      />
      <Route
        path={ROUTE.vaccination}
        element={withSuspense(<ServiceVaccination />)}
      />
      <Route
        path={ROUTE.diagnosticCare}
        element={withSuspense(<ServiceDiagnosticCare />)}
      />
      <Route
        path={ROUTE.dentalCare}
        element={withSuspense(<ServicesDentalCare />)}
      />
      <Route path={ROUTE.surgery} element={withSuspense(<ServicesSurgery />)} />
      <Route path={ROUTE.aboutUs} element={withSuspense(<About />)} />
      <Route
        path={ROUTE.bookAppointment}
        element={withSuspense(<Appointment />)}
      />
      <Route
        path={ROUTE.bookAppointmentReschedule}
        element={withSuspense(<AppointmentReschedule />)}
      />
      <Route path={ROUTE.newPatients} element={withSuspense(<NewPatients />)} />
      <Route path={ROUTE.contact} element={withSuspense(<Contact />)} />
      <Route path={ROUTE.petCare} element={withSuspense(<PetCareLibrary />)} />
      <Route
        path={ROUTE.petCareCategory}
        element={withSuspense(<PetCareCategory />)}
      />
      <Route
        path={ROUTE.petCareArticle}
        element={withSuspense(<PetCareArticle />)}
      />
      <Route path={ROUTE.petCarePreview} element={withSuspense(<PetCarePreview />)} />
      <Route path={ROUTE.privacyPolicy} element={withSuspense(<PrivacyPolicy />)} />
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
