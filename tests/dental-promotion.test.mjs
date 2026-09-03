import assert from "node:assert/strict";
import test from "node:test";
import { dentalPromotion, isCampaignActive } from "../src/app/campaigns/dental-promotion.mjs";

test("uses the original hero before the campaign begins", () => {
  assert.equal(isCampaignActive(dentalPromotion, new Date("2026-09-01T04:59:59Z")), false);
});

test("uses the promotional hero when the campaign begins in Chicago", () => {
  assert.equal(isCampaignActive(dentalPromotion, new Date("2026-09-01T05:00:00Z")), true);
});

test("keeps the promotion visible through the final Chicago second", () => {
  assert.equal(isCampaignActive(dentalPromotion, new Date("2026-11-01T04:59:59Z")), true);
});

test("uses the original hero after the campaign expires in Chicago", () => {
  assert.equal(isCampaignActive(dentalPromotion, new Date("2026-11-01T05:00:00Z")), false);
});

test("falls back to the original hero when the campaign is disabled or invalid", () => {
  assert.equal(isCampaignActive({ ...dentalPromotion, enabled: false }, new Date("2026-09-15T12:00:00Z")), false);
  assert.equal(isCampaignActive({ ...dentalPromotion, startsAt: "invalid" }, new Date("2026-09-15T12:00:00Z")), false);
  assert.equal(isCampaignActive(dentalPromotion, new Date("invalid")), false);
});
