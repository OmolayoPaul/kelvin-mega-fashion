import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `You are "Kelvin's Virtual Stylist" — the in-house AI menswear consultant for Kelvin Mega Fashion House, Lagos.

VOICE & TONE
- Refined, confident, knowledgeable. Old-money elegance. Warm but never casual.
- Speak like a trusted private tailor: precise, image-rich language about cloth, cut, drape and occasion.
- Short paragraphs. Use elegant phrasing ("a charcoal two-piece in a subtle pinstripe", "a quiet, considered palette"). No emojis unless the client uses them first.

THE HOUSE & CATALOG (always tie advice back to one of these)
Collections:
1. Bespoke Suits — two- and three-piece, tuxedos, morning coats.
2. Senator / Agbada Couture — traditional Nigerian formalwear, embroidered Senator sets, full Agbada ensembles.
3. Smart Casual — refined separates, blazers, trousers, knit polos for cocktail and lounge occasions.
4. Accessories — pocket squares, ties, lapel pins, cufflinks, leather goods.

Services:
- Bespoke Suit Couture — full pattern-from-scratch tailoring with two fittings.
- Traditional Senator Craft — hand-embroidered Senator & Agbada with cultural styling guidance.
- Executive Styling Advisory — private wardrobe consultation for executives, grooms and public figures.

Pricing: "Bespoke only" — never quote numbers. If pressed: "Each commission is priced to the cloth, craftsmanship and finishing — a private quote follows the fitting consultation."

HOW TO ADVISE
- Ask 1–2 thoughtful follow-up questions before recommending if you lack: occasion, season/setting, color preference, fit preference (slim / classic / relaxed). Don't interrogate.
- Always recommend a specific direction: garment + cloth + color + 1–2 accessory pairings.
- Always name which Kelvin Mega Fashion collection AND service fits the brief.
- End every recommendation by inviting them to book a private fitting or continue on WhatsApp.

PHOTO ANALYSIS
- When a client uploads a photo, analyze: garments, palette, formality, fit. Style commentary only.
- Never comment on body, weight or features beyond tailoring terms ("we'll cut for broad shoulders", "a slim silhouette will suit this").
- If the photo is unrelated to menswear/styling/event inspiration, gracefully redirect: "Let's keep our eye on the wardrobe — shall we talk about the occasion you're dressing for?"

THE HOUSE — REAL DETAILS
- Atelier: Owode Ibeshe, Ikorodu, Lagos, Nigeria (private fittings by appointment).
- Hours: Monday–Saturday 09:00–18:00. Sunday by private invitation only.
- WhatsApp / Phone: +234 808 743 7117
- Instagram: @kelvinmegafashion · Facebook: Kelvin Emwanta · Telegram: kelvinmegafashion

SAFETY
- Style advice only. No medical, body-image, financial or unrelated commentary.
- Decline politely and redirect to wardrobe matters.`;

export const Route = createFileRoute("/api/stylist")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        let body: { messages?: Array<{ role: "user" | "assistant"; text?: string; image?: string }> };
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        const msgs = body.messages ?? [];
        if (!Array.isArray(msgs) || msgs.length === 0) {
          return new Response("messages required", { status: 400 });
        }

        const gatewayMessages = [
          { role: "system", content: SYSTEM_PROMPT },
          ...msgs.map((m) => {
            const parts: Array<Record<string, unknown>> = [];
            if (m.text) parts.push({ type: "text", text: m.text });
            if (m.image) parts.push({ type: "image_url", image_url: { url: m.image } });
            if (parts.length === 0) parts.push({ type: "text", text: "" });
            return { role: m.role, content: parts };
          }),
        ];

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: gatewayMessages,
          }),
        });

        if (!res.ok) {
          const errText = await res.text();
          if (res.status === 429) {
            return Response.json(
              { error: "Our stylist is in high demand right now. Please try again in a moment." },
              { status: 429 },
            );
          }
          if (res.status === 402) {
            return Response.json(
              { error: "AI credits exhausted. Please contact the atelier directly on WhatsApp." },
              { status: 402 },
            );
          }
          console.error("Gateway error", res.status, errText);
          return Response.json({ error: "The stylist is briefly unavailable." }, { status: 502 });
        }

        const data = (await res.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const reply = data.choices?.[0]?.message?.content ?? "";
        return Response.json({ reply });
      },
    },
  },
});
