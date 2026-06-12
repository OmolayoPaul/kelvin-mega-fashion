import { createFileRoute } from "@tanstack/react-router";
import { Lookbook, PageHero, Gram } from "@/components/site";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — From Sketch to Silhouette | Kelvin Mega" },
      { name: "description", content: "Behind the seams: process, accessories, and the philosophy of the Kelvin Mega Fashion House atelier." },
      { property: "og:title", content: "Lookbook — Kelvin Mega Fashion" },
      { property: "og:description", content: "From concept to finished silhouette — see the craft." },
    ],
  }),
  component: () => (
    <>
      <PageHero kicker="The Lookbook" title="From Sketch to" accent="Silhouette." sub="Process, accessories, and the philosophy that shapes every commission." />
      <Lookbook />
      <Gram />
    </>
  ),
});
