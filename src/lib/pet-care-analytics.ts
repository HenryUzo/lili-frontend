import { useEffect, useRef } from "react";
import { pushDataLayerEvent } from "./analytics";

type NullableArticleValue = string | null;

type ArticleContext = {
  article_slug: string;
  article_category: string;
  article_author_id?: string;
  article_reviewer_id?: string;
};

type OptionalArticleContext = {
  article_slug: NullableArticleValue;
  article_category: NullableArticleValue;
};

type PetCarePetPreference = "DOG" | "CAT" | "BOTH";

const oneTimeEvents = new Set<string>();

function trackOnce(key: string, payload: Record<string, unknown>) {
  if (oneTimeEvents.has(key)) {
    return;
  }

  oneTimeEvents.add(key);
  pushDataLayerEvent(payload);
}

export function trackPetCareArticleView(context: ArticleContext) {
  trackOnce(`article-view:${context.article_slug}`, {
    event: "pet_care_article_view",
    article_slug: context.article_slug,
    article_category: context.article_category,
    article_author_id: context.article_author_id,
    article_reviewer_id: context.article_reviewer_id
  });
}

export function trackPetCareArticleScrollDepth(
  context: Pick<ArticleContext, "article_slug" | "article_category">,
  scrollPercent: 50 | 90
) {
  trackOnce(`article-scroll:${context.article_slug}:${scrollPercent}`, {
    event:
      scrollPercent === 50
        ? "pet_care_article_50_percent"
        : "pet_care_article_complete",
    article_slug: context.article_slug,
    article_category: context.article_category,
    scroll_percent: scrollPercent
  });
}

export function usePetCareArticleScrollDepth(context: Pick<ArticleContext, "article_slug" | "article_category">) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = contentRef.current;
    if (!element || typeof window === "undefined") {
      return undefined;
    }

    function handleScroll() {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const totalTrack = rect.height + viewportHeight;
      const viewed = viewportHeight - rect.top;
      const percent = Math.max(0, Math.min(100, Math.round((viewed / totalTrack) * 100)));

      if (percent >= 50) {
        trackPetCareArticleScrollDepth(context, 50);
      }

      if (percent >= 90) {
        trackPetCareArticleScrollDepth(context, 90);
      }
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [context.article_category, context.article_slug]);

  return contentRef;
}

export function trackPetCareSearch(input: {
  result_count: number;
  article_category: string;
}) {
  pushDataLayerEvent({
    event: "pet_care_search",
    result_count: input.result_count,
    article_category: input.article_category
  });
}

export function trackPetCareCategoryClick(input: {
  article_category: string;
  cta_location: string;
}) {
  pushDataLayerEvent({
    event: "pet_care_category_click",
    article_category: input.article_category,
    cta_location: input.cta_location
  });
}

export function trackPetCareRelatedArticleClick(input: {
  article_slug: string;
  related_article_slug: string;
  cta_location: string;
}) {
  pushDataLayerEvent({
    event: "pet_care_related_article_click",
    article_slug: input.article_slug,
    related_article_slug: input.related_article_slug,
    cta_location: input.cta_location
  });
}

export function trackPetCareServiceClick(input: {
  article_slug?: NullableArticleValue;
  article_category?: NullableArticleValue;
  related_service: string;
  cta_location: string;
}) {
  pushDataLayerEvent({
    event: "pet_care_service_click",
    article_slug: input.article_slug ?? null,
    article_category: input.article_category ?? null,
    related_service: input.related_service,
    cta_location: input.cta_location
  });
}

export function trackPetCareAppointmentClick(input: OptionalArticleContext & { cta_location: string }) {
  pushDataLayerEvent({
    event: "pet_care_appointment_click",
    article_slug: input.article_slug,
    article_category: input.article_category,
    cta_location: input.cta_location
  });
}

export function trackPetCareUrgentCareClick(input: OptionalArticleContext & { cta_location: string }) {
  pushDataLayerEvent({
    event: "pet_care_urgent_care_click",
    article_slug: input.article_slug,
    article_category: input.article_category,
    cta_location: input.cta_location
  });
}

export function trackPetCareCallClick(input: OptionalArticleContext & { cta_location: string }) {
  pushDataLayerEvent({
    event: "pet_care_call_click",
    article_slug: input.article_slug,
    article_category: input.article_category,
    cta_location: input.cta_location
  });
}

export function trackPetCareNewsletterSignup(input: {
  pet_preference: PetCarePetPreference;
  cta_location?: string;
}) {
  pushDataLayerEvent({
    event: "pet_care_newsletter_signup",
    pet_preference: input.pet_preference,
    cta_location: input.cta_location ?? "pet_care_newsletter",
    signup_status: "confirmation_required"
  });
}
