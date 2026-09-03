export const dentalPromotion = {
  enabled: true,
  startsAt: "2026-09-01T00:00:00",
  endsAt: "2026-10-31T23:59:59",
  timeZone: "America/Chicago",
};

function localDateTimeParts(date, timeZone) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const value = Object.fromEntries(
    parts
      .filter(({ type }) => type !== "literal")
      .map(({ type, value }) => [type, value]),
  );

  if (!value.year || !value.month || !value.day || !value.hour || !value.minute || !value.second) {
    return null;
  }

  return `${value.year}-${value.month}-${value.day}T${value.hour}:${value.minute}:${value.second}`;
}

function isCampaignDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(value);
}

export function isCampaignActive(campaign, now = new Date()) {
  if (!campaign?.enabled || !(now instanceof Date) || Number.isNaN(now.getTime())) {
    return false;
  }

  if (!isCampaignDate(campaign.startsAt) || !isCampaignDate(campaign.endsAt) || campaign.startsAt > campaign.endsAt) {
    return false;
  }

  try {
    const localNow = localDateTimeParts(now, campaign.timeZone);
    return localNow !== null && localNow >= campaign.startsAt && localNow <= campaign.endsAt;
  } catch {
    return false;
  }
}
