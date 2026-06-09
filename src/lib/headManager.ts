type MetaSelector = {
  key: string;
  value: string;
};

function ensureHeadElement<T extends HTMLElement>(
  selector: string,
  create: () => T,
) {
  const existing = document.head.querySelector<T>(selector);
  if (existing) return existing;

  const created = create();
  document.head.appendChild(created);
  return created;
}

export function upsertMeta(selector: MetaSelector, content: string) {
  const cssSelector = `meta[${selector.key}="${selector.value}"]`;
  const element = ensureHeadElement(cssSelector, () => {
    const meta = document.createElement("meta");
    meta.setAttribute(selector.key, selector.value);
    return meta;
  });

  element.setAttribute("content", content);
}

export function upsertCanonical(href: string) {
  const element = ensureHeadElement('link[rel="canonical"]', () => {
    const link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    return link;
  });

  element.setAttribute("href", href);
}

export function upsertStructuredData(
  marker: string,
  items: Array<Record<string, unknown>>,
) {
  document.head
    .querySelectorAll(`script[data-lilivet-structured="${marker}"]`)
    .forEach((node) => node.remove());

  items.forEach((item, index) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.lilivetStructured = marker;
    script.dataset.lilivetStructuredIndex = String(index);
    script.text = JSON.stringify(item);
    document.head.appendChild(script);
  });
}

export function clearStructuredData(marker: string) {
  document.head
    .querySelectorAll(`script[data-lilivet-structured="${marker}"]`)
    .forEach((node) => node.remove());
}
