const allowedTags = new Set([
  "A",
  "B",
  "BLOCKQUOTE",
  "BR",
  "DIV",
  "EM",
  "FONT",
  "H2",
  "H3",
  "H4",
  "I",
  "LI",
  "OL",
  "P",
  "SPAN",
  "STRONG",
  "TABLE",
  "TBODY",
  "TD",
  "TH",
  "THEAD",
  "TR",
  "U",
  "UL",
]);

export function sanitizePetCareRichText(value: string) {
  if (typeof DOMParser === "undefined") return value.replace(/<[^>]*>/g, "");

  const document = new DOMParser().parseFromString(value, "text/html");
  const clean = (node: Node) => {
    for (const child of Array.from(node.childNodes)) clean(child);
    if (!(node instanceof Element)) return;

    if (!allowedTags.has(node.tagName)) {
      node.replaceWith(...Array.from(node.childNodes));
      return;
    }

    for (const attribute of Array.from(node.attributes)) {
      const name = attribute.name.toLowerCase();
      const isSafeLink = node.tagName === "A" && name === "href";
      const isSafeStyle = name === "style" && /^(color:\s*#[0-9a-f]{6}|text-align:\s*(left|center|right|justify))\s*;?$/i.test(attribute.value);
      const isSafeFontColor = node.tagName === "FONT" && name === "color" && /^#[0-9a-f]{6}$/i.test(attribute.value);
      if (!isSafeLink && !isSafeStyle && !isSafeFontColor) node.removeAttribute(attribute.name);
    }

    if (node.tagName === "A") {
      const href = node.getAttribute("href")?.trim() ?? "";
      if (!/^(https?:|mailto:|#)/i.test(href)) node.removeAttribute("href");
      else {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noreferrer");
      }
    }
  };

  for (const child of Array.from(document.body.childNodes)) clean(child);
  return document.body.innerHTML;
}
