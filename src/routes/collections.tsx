import { createFileRoute } from "@tanstack/react-router";
import { Collections, PageHero, Gram } from "@/components/site";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Bespoke Agbada, Suits & Senator | Kelvin Mega" },
      { name: "description", content: "A curated archive of bespoke commissions: Agbada, Senator wear, suits, and smart casual — each piece one-of-one." },
      { property: "og:title", content: "Collections — Kelvin Mega Fashion" },
      { property: "og:description", content: "Bespoke commissions, hand-cut in our Lagos atelier." },
    ],
  }),
  component: () => (
    <>
      <PageHero kicker="Signature Works" title="The" accent="Collections." sub="A curated archive of pieces commissioned by gentlemen of taste — each one bespoke, never repeated." />
      <Collections />
      <Gram />
    </>
  ),
});
