import test from "node:test";
import assert from "node:assert/strict";
import { isProheartPromotionActive, proheartPromotion } from "../src/app/campaigns/proheart-promotion.mjs";

test("ProHeart offer follows Chicago dates, including the final day", () => {
  assert.equal(isProheartPromotionActive(new Date("2026-10-08T04:59:59Z")), false);
  assert.equal(isProheartPromotionActive(new Date("2026-10-08T05:00:00Z")), true);
  assert.equal(isProheartPromotionActive(new Date("2027-04-09T04:59:59Z")), true);
  assert.equal(isProheartPromotionActive(new Date("2027-04-09T05:00:00Z")), false);
});

test("ProHeart price tiers match the promotion artwork", () => {
  assert.deepEqual(proheartPromotion.tiers, [
    { weight: "0-25 lb", injection: "$39.50", test: "$15.00", total: "$54.50" },
    { weight: "26-50 lb", injection: "$42.50", test: "$15.00", total: "$57.50" },
    { weight: "51+ lb", injection: "$55.00", test: "$15.00", total: "$70.00" },
  ]);
});
