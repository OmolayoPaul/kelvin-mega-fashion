import { createFileRoute } from "@tanstack/react-router";
import { About, PageHero } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "The Designer — Kelvin Emwanta | Kelvin Mega Fashion" },
      { name: "description", content: "Meet Kelvin Emwanta — the master tailor and creative director behind Kelvin Mega Fashion House, Lagos." },
      { property: "og:title", content: "The Designer — Kelvin Emwanta" },
      { property: "og:description", content: "A decade of bespoke craft, dressing senators, executives, and grooms across West Africa." },
    ],
  }),
  component: () => (
    <>
      <PageHero kicker="The Designer" title="The Hands Behind" accent="Every Stitch." sub="Kelvin Emwanta has spent more than a decade turning measurement into character, fabric into language." />
      <About />
    </>
  ),
});
