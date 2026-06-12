import { createFileRoute } from "@tanstack/react-router";
import { Testimonials, PageHero } from "@/components/site";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — What Our Clientele Say | Kelvin Mega" },
      { name: "description", content: "Words from chiefs, executives, and gentlemen across Nigeria who entrust Kelvin Mega with their wardrobe." },
      { property: "og:title", content: "Reviews — Kelvin Mega Fashion" },
      { property: "og:description", content: "Six years of return clients and quiet recommendations." },
    ],
  }),
  component: () => (
    <>
      <PageHero kicker="Gentlemen Speak" title="Words from" accent="The Clientele." sub="Discreet, exacting, and faithfully returned to — the verdict from those we've dressed." />
      <Testimonials />
    </>
  ),
});
