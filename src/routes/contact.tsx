import { createFileRoute } from "@tanstack/react-router";
import { ContactForm, PageHero, Newsletter } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Fitting — Contact Kelvin Mega Fashion, Lagos" },
      { name: "description", content: "Visit our Owode Ibeshe atelier in Ikorodu, Lagos, or book a private fitting via WhatsApp." },
      { property: "og:title", content: "Book a Fitting — Kelvin Mega" },
      { property: "og:description", content: "Private fittings, by appointment only — Owode Ibeshe, Lagos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero kicker="Visit The Atelier" title="Book a" accent="Private Fitting." sub="By appointment only. Tell us about your occasion and our atelier will respond within 24 hours." />
      <ContactForm />
      <Newsletter />
    </>
  ),
});
