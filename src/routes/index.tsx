import { createFileRoute } from "@tanstack/react-router";
import { Hero, HomeHighlights, About, Testimonials, Newsletter } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kelvin Mega Fashion — Bespoke Tailoring House, Lagos" },
      { name: "description", content: "Lagos atelier crafting bespoke suits, Senator couture, and executive smart-casual for discerning gentlemen." },
      { property: "og:title", content: "Kelvin Mega Fashion House" },
      { property: "og:description", content: "Uncompromising fit. Bespoke men's couture from Lagos." },
    ],
  }),
  component: () => (
    <>
      <Hero />
      <HomeHighlights />
      <About />
      <Testimonials />
      <Newsletter />
    </>
  ),
});
