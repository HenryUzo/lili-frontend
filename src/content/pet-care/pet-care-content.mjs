export const petCareCategories = [
  {
    slug: "urgent-care",
    label: "Urgent Care",
    description: "Guidance on symptoms that may need prompt veterinary attention.",
  },
  { slug: "dogs", label: "Dogs", description: "Everyday dog health topics." },
  { slug: "cats", label: "Cats", description: "Cat care, behavior, and health." },
  {
    slug: "puppy-kitten-care",
    label: "Puppy & Kitten Care",
    description: "Early-life care for young pets.",
  },
  {
    slug: "preventive-care",
    label: "Preventive Care",
    description: "Wellness exams, screening, and long-term prevention.",
  },
  {
    slug: "vaccinations",
    label: "Vaccinations",
    description: "Vaccine timing and protection basics.",
  },
  {
    slug: "dental-health",
    label: "Dental Health",
    description: "Oral health signs, prevention, and cleanings.",
  },
  {
    slug: "surgery-recovery",
    label: "Surgery & Recovery",
    description: "Preparation and aftercare for procedures.",
  },
  {
    slug: "wellness-plans",
    label: "Wellness Plans",
    description: "Predictable preventive care planning.",
  },
  {
    slug: "seasonal-pet-safety",
    label: "Seasonal Pet Safety",
    description: "South Texas heat, holidays, parasites, and safety.",
  },
];

export const veterinaryReviewers = [
  {
    id: "olatade-okafor",
    name: "Dr. Olatade Okafor",
    credentials: "DVM",
    role: "Veterinarian",
    photoKey: "drOkafor",
    photoFile: "dr-okafor.webp",
    shortBio:
      "Dr. Okafor reviews Lili Vet educational resources so pet parents have calm, practical guidance before deciding on the right next step.",
    active: true,
  },
];

export const articleAuthor = {
  id: "lili-vet-care-team",
  name: "Lili Veterinary Hospital Care Team",
  role: "Veterinary Care Team",
};

const urgentCareSections = [
  {
    id: "immediate-answer",
    title: "Immediate answer",
    content: [
      "You should contact a veterinarian promptly when your dog has symptoms that are sudden, severe, worsening, or unusual for them. Trouble breathing, collapse, repeated vomiting, uncontrolled bleeding, severe pain, major trauma, or seizures should be treated as emergencies.",
      "If you are unsure, it is safer to call the clinic and describe what you are seeing. A veterinary team can help decide whether your pet should be seen urgently, monitored closely, or routed to a full emergency hospital.",
    ],
  },
  {
    id: "common-signs",
    title: "Common signs that may need urgent care",
    content: [
      "Dogs often show discomfort through behavior changes before symptoms look dramatic. Watch for sudden lethargy, repeated vomiting or diarrhea, limping, coughing, breathing changes, pale gums, swelling, eye injuries, or signs of pain.",
    ],
    bullets: [
      "Repeated vomiting or diarrhea, especially with blood",
      "Difficulty breathing, persistent coughing, or blue/pale gums",
      "Sudden weakness, collapse, seizures, or disorientation",
      "Limping, wounds, swelling, or signs of severe pain",
      "Eye injuries, toxin exposure, or heat stress",
    ],
  },
  {
    id: "possible-causes",
    title: "Possible causes",
    content: [
      "Urgent symptoms can come from infections, injuries, stomach or intestinal problems, toxin exposure, heat stress, allergic reactions, pain, or chronic disease flare-ups.",
      "The same symptom can have several causes, so a veterinary exam is the safest way to narrow down what is happening.",
    ],
  },
  {
    id: "monitor-at-home",
    title: "What pet parents can monitor",
    content: [
      "If your dog is stable and you are waiting for guidance, note when symptoms started, how often they are happening, appetite, water intake, bathroom habits, energy level, gum color, and any possible exposure to food, plants, medications, or chemicals.",
    ],
  },
  {
    id: "contact-vet",
    title: "When to contact a veterinarian",
    content: [
      "Call if symptoms are new, worsening, painful, repeated, or hard to explain. Puppies, senior dogs, and pets with existing health issues should be assessed more cautiously.",
      "If your pet is struggling to breathe, unconscious, having uncontrolled seizures, bleeding heavily, or experiencing severe trauma, seek emergency care immediately.",
    ],
  },
  {
    id: "visit-expectations",
    title: "What to expect during the visit",
    content: [
      "The veterinary team will ask about your dog's symptoms, timeline, appetite, medications, vaccine status, and possible exposures. The visit may include a physical exam, pain assessment, lab work, imaging, medication, fluids, or a referral if emergency-level care is needed.",
    ],
  },
  {
    id: "prevention",
    title: "Prevention and next steps",
    content: [
      "Regular wellness care, vaccinations, parasite prevention, dental care, safe storage of medications and toxins, and early attention to small changes can reduce many urgent visits.",
    ],
  },
];

function standardSections(excerpt) {
  return [
    {
      id: "immediate-answer",
      title: "Immediate answer",
      content: [excerpt],
    },
    {
      id: "common-signs",
      title: "Common signs",
      content: [
        "Pet parents should watch for changes in appetite, energy, bathroom habits, breathing, mobility, comfort, and behavior.",
      ],
    },
    {
      id: "possible-causes",
      title: "Possible causes",
      content: [
        "Many symptoms can have several possible causes, from minor irritation to conditions that need prompt veterinary care.",
      ],
    },
    {
      id: "monitor-at-home",
      title: "What pet parents can monitor",
      content: [
        "Write down what changed, when it started, how often it occurs, and whether your pet is eating, drinking, and acting normally.",
      ],
    },
    {
      id: "contact-vet",
      title: "When to contact a veterinarian",
      content: [
        "Contact the clinic when symptoms are severe, repeated, worsening, painful, or unusual for your pet.",
      ],
    },
    {
      id: "visit-expectations",
      title: "What to expect during the visit",
      content: [
        "The team may recommend a physical exam, diagnostic testing, preventive care updates, medication, or follow-up monitoring.",
      ],
    },
    {
      id: "prevention",
      title: "Prevention and next steps",
      content: [
        "Wellness exams, vaccines, parasite prevention, dental care, and early visits help keep small concerns from becoming bigger problems.",
      ],
    },
  ];
}

function article(input) {
  const excerpt = input.excerpt;

  return {
    authorId: "lili-vet-care-team",
    reviewerId: "olatade-okafor",
    publishedAt: "2026-05-12",
    updatedAt: "2026-06-18",
    reviewedAt: "2026-06-18",
    status: "published",
    reviewStatus: "medically-reviewed",
    keyTakeaways: [
      "Small changes in behavior can be early health clues.",
      "A veterinarian can help decide what is urgent and what can be monitored.",
      "Preventive care makes it easier to catch problems earlier.",
    ],
    monitorAtHome: [
      "When the symptom started and whether it is changing",
      "Eating, drinking, bathroom habits, and energy level",
      "Pain, breathing changes, vomiting, diarrhea, or visible swelling",
    ],
    warningCallout:
      "Educational information only. This article is not a diagnosis and does not replace a veterinary examination. If symptoms feel urgent or life-threatening, call a veterinarian or seek emergency care immediately.",
    vetQuote:
      "When you are unsure, calling early is often the safest next step.",
    faqs: [
      {
        question: "Should I wait to see if symptoms improve?",
        answer:
          "If symptoms are severe, repeated, painful, or worsening, call a veterinarian instead of waiting.",
      },
      {
        question: "Can I give human medication at home?",
        answer:
          "Do not give human medication unless a veterinarian specifically tells you it is safe for your pet.",
      },
      {
        question: "What should I bring to the visit?",
        answer:
          "Bring medication names, vaccine history, photos or videos of symptoms, and any packaging for possible toxin exposure.",
      },
    ],
    references: [
      {
        label: "American Veterinary Medical Association: Pet health resources",
        url: "https://www.avma.org/resources/pet-owners",
      },
      {
        label: "Merck Veterinary Manual: Owner-focused pet health topics",
        url: "https://www.merckvetmanual.com/",
      },
    ],
    sections: standardSections(excerpt),
    ...input,
  };
}

export const petCareArticles = [];
