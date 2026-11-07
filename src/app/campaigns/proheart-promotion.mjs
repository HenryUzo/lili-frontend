import { isCampaignActive } from "./campaign-window.mjs";

export const proheartPromotion = {
  enabled: true,
  slug: "proheart6",
  startsAt: "2026-10-08T00:00:00",
  endsAt: "2027-04-08T23:59:59",
  timeZone: "America/Chicago",
  tiers: [
    { weight: "0-25 lb", injection: "$39.50", test: "$15.00", total: "$54.50" },
    { weight: "26-50 lb", injection: "$42.50", test: "$15.00", total: "$57.50" },
    { weight: "51+ lb", injection: "$55.00", test: "$15.00", total: "$70.00" },
  ],
};

export function isProheartPromotionActive(now = new Date()) {
  return isCampaignActive(proheartPromotion, now);
}
