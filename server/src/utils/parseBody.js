const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = async (body, url) => {
  try {
    const dom = new JSDOM(body);
    const document = dom.window.document;

    // Extract the domain from the base URL
    const baseDomain = new URL(url).hostname;
    url = url.split("#")[0];

    // List of selectors to remove
    const selectorsToRemove = [
      "script",
      "style",
      "nav",
      "header",
      "footer",
      "aside",
      "form",
      "noscript",
      "iframe",
      ".ads",
      ".advertisement",
      '[aria-hidden="true"]',
    ];

    // Remove unwanted elements
    selectorsToRemove.forEach((selector) => {
      document.querySelectorAll(selector).forEach((elem) => elem.remove());
    });

    // Handle <a> and <img> tags
    document.querySelectorAll("a").forEach((anchor) => {
      let href = anchor.getAttribute("href") || "No href";

      // Fix relative URLs
      if (href.startsWith("/")) {
        href = `${baseDomain}${href}`;
      } else if (href.startsWith("#")) {
        href = `${url}${href}`;
      }

      const text = anchor.textContent.trim();
      anchor.textContent = `[Link: text: ${text || "No text"} - src: ${href}]`;
    });

    document.querySelectorAll("img").forEach((image) => {
      let src = image.getAttribute("src");
      const alt = image.getAttribute("alt") || "No alt text";

      // Fix relative URLs
      if (src && src.startsWith("/")) {
        src = `${baseDomain}${src}`;
      }

      image.textContent = `[Image: alt: ${alt} - src: ${src || "No src"}]`;
    });

    // Extract text content from the cleaned document
    let textContent = document.body.textContent;

    // Clean up whitespace
    textContent = textContent.replace(/\s+/g, " ").trim();

    console.log(textContent);
    return textContent;
  } catch (error) {
    console.error("Error parsing body:", error);
    throw new Error("Error parsing body");
  }
};
