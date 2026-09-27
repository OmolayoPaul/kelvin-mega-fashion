import { createFileRoute } from "@tanstack/react-router";
import { Services, PageHero, ContactForm } from "@/components/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Bespoke Suits, Senator Craft & Styling" },
      { name: "description", content: "Three atelier services: bespoke suit couture, traditional Senator craft, and executive styling advisory." },
      { property: "og:title", content: "Atelier Services — Kelvin Mega" },
      { property: "og:description", content: "Bespoke suits, Senator craft, and private styling advisory." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero kicker="Atelier Services" title="The Craft" accent="We Offer." sub="Three quiet services — each delivered with the patience the work deserves." />
      <Services />
      <ContactForm />
    </>
  ),
});
