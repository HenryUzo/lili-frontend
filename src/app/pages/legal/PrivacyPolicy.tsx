import { HeartHandshake, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../../components/seo/Seo";
import {
  PRIVACY_POLICY_DISPLAY_DATE,
  PRIVACY_POLICY_EFFECTIVE_DATE,
  PRIVACY_POLICY_UPDATED_DATE,
  privacyPolicyIntroduction,
  privacyPolicySections,
} from "../../../content/legal/privacy-policy";
import {
  buildCanonicalUrl,
  CLINIC_ADDRESS,
  CLINIC_PHONE_DISPLAY,
  CLINIC_PHONE_E164,
  SITE_NAME,
  SITE_URL,
} from "../../../lib/seo-config";

const title = "Privacy Policy | Lili Veterinary Hospital";
const description =
  "Learn how Lili Veterinary Hospital collects, uses, protects and shares information submitted through our website, veterinary forms and email communications.";

const contactAddress = `${CLINIC_ADDRESS.streetAddress}, ${CLINIC_ADDRESS.addressLocality}, ${CLINIC_ADDRESS.addressRegion} ${CLINIC_ADDRESS.postalCode}`;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Privacy Policy",
        item: buildCanonicalUrl("/privacy-policy"),
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: buildCanonicalUrl("/privacy-policy"),
    datePublished: PRIVACY_POLICY_EFFECTIVE_DATE,
    dateModified: PRIVACY_POLICY_UPDATED_DATE,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  },
];

function TableOfContents({ mobile = false }: { mobile?: boolean }) {
  const links = (
    <ol className="mt-4 space-y-1.5 text-[15px] leading-6">
      {privacyPolicySections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="flex min-h-11 items-center rounded-md px-3 py-2 text-[#365447] transition hover:bg-[#E4EFDC] hover:text-[#006838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006838]"
          >
            {section.title}
          </a>
        </li>
      ))}
      <li>
        <a
          href="#contact-us"
          className="flex min-h-11 items-center rounded-md px-3 py-2 text-[#365447] transition hover:bg-[#E4EFDC] hover:text-[#006838] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006838]"
        >
          14. Contact Us
        </a>
      </li>
    </ol>
  );

  if (mobile) {
    return (
      <details className="rounded-md border border-[#C9DCC0] bg-[#F8FBF4] p-4 lg:hidden">
        <summary className="flex min-h-11 cursor-pointer items-center font-bold text-[#073D2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006838]">
          On this page
        </summary>
        {links}
      </details>
    );
  }

  return (
    <nav aria-label="Privacy Policy table of contents" className="sticky top-32 hidden lg:block">
      <p className="text-sm font-bold uppercase text-[#006838]">On this page</p>
      {links}
    </nav>
  );
}

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title={title}
        description={description}
        path="/privacy-policy"
        robots="index,follow"
        type="website"
        structuredData={structuredData}
      />

      <a
        href="#privacy-policy-content"
        className="fixed left-4 top-4 z-[2000] -translate-y-24 rounded-md bg-[#073D2A] px-5 py-3 font-bold text-white transition focus:translate-y-0"
      >
        Skip to Privacy Policy
      </a>

      <main className="bg-[#F7FAF2] text-[#173D2A]">
        <header className="border-b border-[#D6E3CF] bg-[#F2F7EE] px-5 py-12 md:px-8 md:py-16">
          <div className="mx-auto max-w-[1280px]">
            <nav aria-label="Breadcrumb" className="mb-10 text-sm text-[#53635A]">
              <ol className="flex flex-wrap items-center gap-2">
                <li><Link to="/" className="min-h-11 py-3 font-bold text-[#006838] underline-offset-4 hover:underline">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">Privacy Policy</li>
              </ol>
            </nav>

            <div className="max-w-[860px]">
              <div className="mb-5 flex items-center gap-3 text-sm font-bold uppercase text-[#006838]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#BFD6B4] bg-[#E9F3E2]" aria-hidden="true">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                Legal
              </div>
              <h1 className="font-founders text-5xl font-medium leading-none text-[#073D2A] md:text-7xl">
                Privacy Policy
              </h1>
              <p className="mt-6 max-w-[820px] text-lg leading-8 text-[#3F594C] md:text-xl">
                This Privacy Policy explains how Lili Veterinary Hospital collects,
                uses, shares and protects information when you use our website,
                request veterinary services, submit forms or subscribe to our communications.
              </p>
              <dl className="mt-8 flex flex-col gap-2 text-sm text-[#53635A] sm:flex-row sm:gap-8">
                <div className="flex gap-2"><dt className="font-bold text-[#173D2A]">Effective date:</dt><dd><time dateTime={PRIVACY_POLICY_EFFECTIVE_DATE}>{PRIVACY_POLICY_DISPLAY_DATE}</time></dd></div>
                <div className="flex gap-2"><dt className="font-bold text-[#173D2A]">Last updated:</dt><dd><time dateTime={PRIVACY_POLICY_UPDATED_DATE}>{PRIVACY_POLICY_DISPLAY_DATE}</time></dd></div>
              </dl>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-12 md:px-8 md:py-16 lg:grid-cols-[260px_minmax(0,820px)] lg:justify-between">
          <TableOfContents />

          <article id="privacy-policy-content" className="min-w-0 scroll-mt-32 text-[17px] leading-8 text-[#365447]">
            <TableOfContents mobile />

            <div className="mt-10 space-y-5 border-b border-[#D6E3CF] pb-12 lg:mt-0">
              {privacyPolicyIntroduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            {privacyPolicySections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32 border-b border-[#D6E3CF] py-12">
                <h2 className="font-founders text-3xl font-medium leading-tight text-[#073D2A] md:text-4xl">{section.title}</h2>
                <div className="mt-5 space-y-5">
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && <ul className="grid gap-2 pl-6 marker:text-[#008F49]">{section.bullets.map((item) => <li key={item} className="list-disc pl-2">{item}</li>)}</ul>}
                  {section.subsections?.map((subsection) => (
                    <div key={subsection.title} className="pt-5">
                      <h3 className="text-xl font-bold leading-7 text-[#173D2A]">{subsection.title}</h3>
                      <div className="mt-3 space-y-4">
                        {subsection.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        {subsection.bullets && <ul className="grid gap-2 pl-6 marker:text-[#008F49]">{subsection.bullets.map((item) => <li key={item} className="list-disc pl-2">{item}</li>)}</ul>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section id="contact-us" className="scroll-mt-32 py-12">
              <div className="flex items-center gap-3">
                <HeartHandshake className="h-7 w-7 text-[#006838]" aria-hidden="true" />
                <h2 className="font-founders text-3xl font-medium leading-tight text-[#073D2A] md:text-4xl">14. Contact Us</h2>
              </div>
              <p className="mt-5">For privacy questions or requests, contact Lili Veterinary Hospital and use the subject “Privacy Request.”</p>
              <address className="mt-6 not-italic">
                <p className="font-bold text-[#173D2A]">Lili Veterinary Hospital</p>
                <p>{contactAddress}</p>
                <p className="mt-3"><a href={`tel:${CLINIC_PHONE_E164}`} className="font-bold text-[#006838] underline underline-offset-4">Call {CLINIC_PHONE_DISPLAY}</a></p>
                <p className="mt-3"><Link to="/contact-us" className="font-bold text-[#006838] underline underline-offset-4">Send a privacy request through our contact page</Link></p>
                <p className="mt-3"><a href={SITE_URL} className="font-bold text-[#006838] underline underline-offset-4">liliveterinaryhospital.com</a></p>
              </address>
              <p className="mt-6">For appointment scheduling, veterinary questions or urgent-care concerns, use the hospital's normal contact and appointment channels rather than the privacy-request process.</p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
