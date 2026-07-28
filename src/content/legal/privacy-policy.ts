export type PrivacyPolicySubsection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type PrivacyPolicySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: PrivacyPolicySubsection[];
};

export const PRIVACY_POLICY_EFFECTIVE_DATE = "2026-07-28";
export const PRIVACY_POLICY_UPDATED_DATE = "2026-07-28";
export const PRIVACY_POLICY_DISPLAY_DATE = "July 28, 2026";

export const privacyPolicyIntroduction = [
  "Lili Veterinary Hospital respects the privacy of our clients, website visitors and newsletter subscribers. This Privacy Policy explains how we collect, use, disclose and protect information when you visit liliveterinaryhospital.com, request an appointment, register a new patient, upload records, communicate with us or subscribe to our Pet Care communications.",
  "By using the website or submitting information to us, you acknowledge the practices described in this Privacy Policy. This policy applies to information collected through the website and related online services. It does not replace any separate consent, treatment, financial or veterinary-record documentation provided by the hospital.",
];

export const privacyPolicySections: PrivacyPolicySection[] = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    paragraphs: [
      "We may collect information that you provide directly to us and information generated automatically when you use the website.",
    ],
    subsections: [
      {
        title: "Information you provide directly",
        paragraphs: ["Depending on how you interact with us, this may include:"],
        bullets: [
          "Your name", "Email address", "Telephone number", "Mailing or residential address",
          "Preferred contact method", "Appointment preferences", "New-client and new-patient registration information",
          "Information included in messages or enquiries", "Newsletter subscription preferences and consent",
          "Information you provide when requesting veterinary services",
        ],
      },
      {
        title: "Pet and veterinary information",
        paragraphs: ["When you request veterinary care or register a pet, we may collect information such as:"],
        bullets: [
          "Pet name", "Species", "Breed", "Age or date of birth", "Sex", "Weight", "Vaccination history",
          "Medical history", "Current medications", "Allergies", "Symptoms or reason for the visit",
          "Previous veterinary provider information", "Veterinary records, laboratory reports, images or other uploaded files",
        ],
      },
      {
        title: "Information submitted for care",
        paragraphs: [
          "Please provide only information that is reasonably necessary for us to understand and respond to your request.",
          "Website forms should not be used when your pet may be experiencing a life-threatening emergency. Contact an emergency veterinary facility or call the hospital for guidance.",
        ],
      },
      {
        title: "Newsletter information",
        paragraphs: ["When you subscribe to Pet Care communications, we may collect:"],
        bullets: [
          "Email address", "Pet preference, such as Dog, Cat or Both", "Consent status", "Subscription source",
          "Confirmation status", "Subscription and confirmation timestamps",
        ],
      },
      {
        title: "Newsletter confirmation",
        paragraphs: ["Newsletter subscriptions use a double-opt-in process. You are not fully subscribed until you complete the confirmation step sent to your email address."],
      },
      {
        title: "Information collected automatically",
        paragraphs: ["When you access the website, our systems and service providers may automatically collect limited technical and usage information, including:"],
        bullets: [
          "Internet Protocol address", "Browser type", "Device type", "Operating system", "Approximate geographic area",
          "Referring website", "Pages visited", "Time and date of visits", "Website interactions",
          "Error, security and diagnostic information", "Cookie or similar identifier information",
        ],
      },
      {
        title: "How automatic information is used",
        paragraphs: ["We use this information to operate, secure, troubleshoot and understand the use of the website."],
      },
    ],
  },
  {
    id: "how-we-use-information",
    title: "2. How We Use Information",
    paragraphs: ["We may use information to:"],
    bullets: [
      "Respond to enquiries", "Schedule and manage veterinary appointments", "Register clients and pets",
      "Prepare for veterinary visits", "Communicate about requested services", "Review records or files submitted by clients",
      "Provide customer service", "Send operational messages related to requests or appointments",
      "Send Pet Care newsletters when consent has been provided", "Maintain newsletter preferences and unsubscribe requests",
      "Improve website content, navigation and performance", "Measure website and Pet Care Library engagement",
      "Protect the website, clients, staff and systems from misuse", "Investigate technical, security or fraud-related issues",
      "Maintain appropriate business and veterinary records", "Comply with legal, regulatory and professional obligations",
      "Establish, exercise or defend legal claims",
    ],
    subsections: [{ title: "Automated decisions", paragraphs: ["We do not use information submitted through veterinary forms to provide automated diagnoses."] }],
  },
  {
    id: "cookies-and-analytics",
    title: "3. Cookies and Analytics",
    paragraphs: [
      "The website may use cookies and similar technologies that help the website operate, remember limited preferences, measure usage and maintain security.",
      "We use Google Tag Manager to manage approved website-measurement tags and Google Analytics 4 to understand general website activity. Depending on the applicable configuration, analytics information may include page views, session information, approximate location, browser type, device information, referral source and website interactions.",
      "Our analytics implementation is intended to avoid sending names, email addresses, telephone numbers, pet names, uploaded files, form contents or symptom descriptions to Google Analytics.",
      "Pet Care analytics events use limited fields such as article slug, category, result count, CTA location and reading progress. Newsletter email addresses are not included in the analytics data layer.",
      "You can configure your browser to reject or delete cookies. Some website features may not operate as expected when cookies are disabled.",
      "Google and other service providers process information under their own privacy terms. Their privacy practices may differ from ours.",
      "We do not currently use this policy to represent that every browser-based privacy signal is automatically honored. Before targeted advertising technologies are introduced, Lili Veterinary Hospital must review whether additional consent or opt-out controls are required.",
    ],
  },
  {
    id: "email-and-brevo",
    title: "4. Email Communications and Brevo",
    paragraphs: [
      "Lili Veterinary Hospital uses Brevo to manage Pet Care newsletter subscriptions and email delivery.",
      "When you voluntarily subscribe, the backend sends the required subscription information to Brevo. The Brevo API key is stored on the server and is not exposed in browser code.",
      "The newsletter requires explicit consent and uses double opt-in. You can unsubscribe by using the unsubscribe link included in an email.",
      "Unsubscribing from marketing emails does not prevent us from sending non-marketing communications that are necessary to respond to your request, provide requested veterinary services or administer an existing relationship.",
      "We do not add appointment or new-patient form users to marketing lists unless they separately provide newsletter consent.",
    ],
  },
  {
    id: "how-we-disclose-information",
    title: "5. How We Disclose Information",
    subsections: [
      { title: "Veterinary staff and authorized personnel", paragraphs: ["Information may be made available to veterinarians, veterinary technicians, administrative staff and other authorized personnel who need it to respond to requests or provide veterinary services."] },
      { title: "Service providers", paragraphs: ["We may use companies that provide services such as:", "These providers may process information only as necessary to provide services to us and subject to applicable contractual or legal obligations."], bullets: ["Website hosting", "Cloud infrastructure", "Database hosting", "Private file storage", "Email delivery", "Analytics", "Website security", "Error monitoring", "Technical support", "Form processing"] },
      { title: "Veterinary-care coordination", paragraphs: ["At your request, with your authorization or where otherwise permitted, information may be shared with laboratories, pharmacies, specialists, emergency facilities, referral hospitals or previous veterinary providers involved in your pet's care."] },
      { title: "Legal and safety disclosures", paragraphs: ["We may disclose information when reasonably necessary to:"], bullets: ["Comply with law, regulation, subpoena or legal process", "Respond to lawful requests from government authorities", "Protect the rights, safety or property of the hospital, clients, staff or others", "Investigate fraud, misuse or security incidents", "Establish, exercise or defend legal claims", "Meet veterinary reporting or professional obligations"] },
      { title: "Business changes", paragraphs: ["If the hospital is involved in a merger, acquisition, reorganization, financing, transfer or sale of business assets, information may be transferred as part of that transaction, subject to applicable law and appropriate confidentiality measures.", "Lili Veterinary Hospital does not sell personal information for monetary consideration.", "The use of analytics or advertising technology can have different meanings under different state privacy laws. Before adding advertising pixels, remarketing or targeted-advertising tools, this policy and the website's privacy controls must be reviewed and updated."] },
    ],
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    paragraphs: ["We retain information for as long as reasonably necessary to:"],
    bullets: ["Fulfil the purposes described in this policy", "Provide veterinary services", "Maintain veterinary and business records", "Resolve disputes", "Enforce agreements", "Meet security, legal, tax, insurance and professional obligations"],
    subsections: [{ title: "Retention practices", paragraphs: ["Different types of information may be retained for different periods.", "Veterinary records may be retained according to applicable professional, regulatory and business requirements.", "Newsletter information may be retained to maintain subscription, confirmation, unsubscribe and suppression records.", "Security logs may be retained for a limited period necessary to detect, investigate and prevent misuse.", "When information is no longer required, we may delete, anonymize or securely dispose of it, subject to applicable obligations and technical limitations."] }],
  },
  {
    id: "information-security",
    title: "7. Information Security",
    paragraphs: ["We use administrative, technical and physical safeguards designed to protect information against unauthorized access, disclosure, alteration, loss or misuse.", "These safeguards may include:"],
    bullets: ["Access controls", "Private server-side storage", "Restricted file permissions", "Secure transport", "Input validation", "File-type and size validation", "Malware or safety inspection", "Rate limiting", "Logging and monitoring", "Environment-based secret management", "Limited staff access"],
    subsections: [{ title: "Security limitations", paragraphs: ["No system, website or transmission method is completely secure. We cannot guarantee absolute security.", "Do not send highly sensitive personal information, passwords, financial-account details or government identification numbers through general website forms unless specifically requested through an approved secure process."] }],
  },
  {
    id: "your-choices",
    title: "8. Your Choices and Privacy Rights",
    paragraphs: ["You may contact us to request assistance with personal information associated with you.", "Depending on your location and the applicability of privacy law, you may have the right to:"],
    bullets: ["Confirm whether we process your personal information", "Request access to personal information", "Request correction of inaccurate information", "Request deletion of information", "Request a portable copy of certain information", "Opt out of certain sales, targeted advertising or profiling", "Withdraw newsletter consent", "Appeal a decision concerning a privacy request"],
    subsections: [
      { title: "Limits and newsletter choices", paragraphs: ["These rights may be limited by exceptions, including veterinary-record requirements, legal obligations, security needs and the rights of other people.", "You may unsubscribe through the link in a newsletter or contact the hospital."] },
      { title: "Cookie choices", paragraphs: ["You may manage cookies through your browser settings. Removing or blocking cookies may affect website functionality."] },
      { title: "Submitting a request", paragraphs: ["To submit a privacy request, contact us using the details in the Contact Us section.", "Please include your full name, your preferred contact method, a clear description of the request and sufficient information for us to identify the relevant records.", "Do not send unnecessary identification documents in the initial request.", "We may need to verify your identity before completing a request. We will use verification information only for that purpose.", "Where permitted, an authorized agent may submit a request for you. We may require proof of the agent's authority and may contact you directly to confirm the request.", "If we deny a request and applicable law provides an appeal right, you may appeal by replying to our decision or contacting us with the subject “Privacy Request Appeal.”", "We will not discriminate against you for exercising an applicable privacy right."] },
    ],
  },
  { id: "childrens-privacy", title: "9. Children's Privacy", paragraphs: ["The website is intended for adults seeking veterinary services and pet-care information.", "It is not directed to children under 13, and we do not knowingly collect personal information directly from children under 13 through the website.", "If you believe a child has submitted personal information without appropriate permission, contact us so that we can review and delete the information where appropriate."] },
  { id: "veterinary-information", title: "10. Veterinary Information", paragraphs: ["Information about an animal's health may be sensitive and important, but veterinary information is not the same as human medical information.", "This website and Lili Veterinary Hospital's services concern animal patients. The website should not be used to submit information about a person's medical condition.", "Veterinary information will be handled according to applicable veterinary, contractual, professional and privacy obligations."] },
  { id: "third-party-services", title: "11. Third-Party Websites and Services", paragraphs: ["The website may include links to or integrations with third-party services, such as:"], bullets: ["Mapping and direction services", "Review platforms", "Social-media platforms", "Online pharmacies", "External payment or financing services", "Email-service providers"], subsections: [{ title: "Independent services", paragraphs: ["When you leave our website or use a third-party service, that provider's privacy policy and terms apply.", "We are not responsible for the privacy, security or content of independent third-party websites."] }] },
  { id: "international-processing", title: "12. International Processing", paragraphs: ["Some service providers may process or store information in the United States or other countries where they operate.", "Privacy and data-protection laws may differ between jurisdictions.", "Where required, we use contractual, organizational or other measures intended to protect information processed by service providers."] },
  { id: "policy-changes", title: "13. Changes to This Privacy Policy", paragraphs: ["We may update this Privacy Policy to reflect changes in:"], bullets: ["Website functionality", "Veterinary services", "Service providers", "Analytics or marketing practices", "Security practices", "Legal or regulatory requirements"], subsections: [{ title: "Notice of changes", paragraphs: ["When changes are made, we will update the “Last updated” date.", "Material changes may also be communicated through the website or another reasonable method where appropriate.", "Continued use of the website after an updated policy becomes effective means that the updated policy applies to subsequent interactions, subject to applicable law."] }] },
];
