import { renderToStaticMarkup } from "react-dom/server";
import Layout from "./components/Layout.jsx";
import { ROUTES, routeFor } from "./routes.js";
import Home from "./pages/Home.jsx";
import Features from "./pages/Features.jsx";
import Pricing from "./pages/Pricing.jsx";
import Guide, { STEPS as GUIDE_STEPS } from "./pages/Guide.jsx";
import Faq, { ITEMS as FAQ_ITEMS } from "./pages/Faq.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Refunds from "./pages/Refunds.jsx";
import Thanks from "./pages/Thanks.jsx";
import NotFound from "./pages/NotFound.jsx";

const PAGES = { "/": Home, "/features": Features, "/pricing": Pricing, "/guide": Guide, "/faq": Faq, "/privacy": Privacy, "/terms": Terms, "/refunds": Refunds, "/thanks": Thanks };

const strip = (jsx) => renderToStaticMarkup(jsx).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

export function renderBody(path) {
  const route = routeFor(path);
  const Page = PAGES[path];
  return renderToStaticMarkup(<Layout route={route}><Page /></Layout>);
}

export function renderNotFound() {
  const route = { path: "/404", crumb: "Not found" };
  return renderToStaticMarkup(<Layout route={route}><NotFound /></Layout>);
}

/* Structured data describes what the page already says. The FAQ answers are
   rendered from the same source the page uses, so the two cannot drift. */
export function schemaFor(route, siteUrl) {
  const url = siteUrl + "/" + route.slug;
  const blocks = [];

  if (route.path === "/") {
    /* The brand entity. Without an Organization and a WebSite, Google has no
       node to hang the name on, and "Tvara" competes with every other use of
       the word. No SearchAction: this site has no search, and claiming one
       that does not exist is the kind of confident wrong answer that gets a
       rich result dropped rather than granted. */
    blocks.push({
      "@context": "https://schema.org", "@type": "Organization",
      "@id": siteUrl + "/#org", name: "Tvara", url: siteUrl + "/",
      logo: siteUrl + "/logo.png", email: "tvara.exten@gmail.com",
      description: route.desc,
    });
    blocks.push({
      "@context": "https://schema.org", "@type": "WebSite",
      "@id": siteUrl + "/#site", name: "Tvara", url: siteUrl + "/",
      inLanguage: "en", publisher: { "@id": siteUrl + "/#org" },
    });
    blocks.push({
      "@context": "https://schema.org", "@type": "SoftwareApplication",
      name: "Tvara", applicationCategory: "BrowserApplication",
      operatingSystem: "Chrome and Edge desktop",
      url: siteUrl,
      description: route.desc,
      offers: [
        { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
        { "@type": "Offer", price: "1", priceCurrency: "USD", name: "Pro · one-time" },
      ],
      featureList: ["Speed engine", "Minimap", "Outline", "In-chat search", "Message timestamps",
                    "Resume", "Markdown and JSON backup", "Total Recall", "Context Bridge", "Allowance tracking"],
    });
  } else {
    blocks.push({
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Tvara", item: siteUrl + "/" },
        { "@type": "ListItem", position: 2, name: route.crumb, item: url },
      ],
    });
  }

  /* The guide IS a how-to, and its steps are the ones the page renders — same
     array, so the markup and the schema cannot describe different products. */
  if (route.path === "/guide") {
    blocks.push({
      "@context": "https://schema.org", "@type": "HowTo",
      name: "How to use Tvara in a long AI chat",
      description: route.desc,
      totalTime: "PT2M",
      step: GUIDE_STEPS.map(([heading, text], i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: heading.replace(/^\d+\s*·\s*/, ""),
        text,
        url: url + "#step-" + (i + 1),
      })),
    });
  }

  if (route.path === "/faq") {
    blocks.push({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((it) => ({
        "@type": "Question", name: it.q,
        acceptedAnswer: { "@type": "Answer", text: strip(it.a) },
      })),
    });
  }
  return blocks;
}

export { ROUTES };
