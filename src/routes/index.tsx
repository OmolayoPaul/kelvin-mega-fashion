import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import look1 from "@/assets/collections/look1.jpeg.asset.json";
import look2 from "@/assets/collections/look2.jpeg.asset.json";
import look3 from "@/assets/collections/look3.jpeg.asset.json";
import look4 from "@/assets/collections/look4.jpeg.asset.json";
import look5 from "@/assets/collections/look5.jpeg.asset.json";
import look6 from "@/assets/collections/look6.jpeg.asset.json";
import look7 from "@/assets/collections/look7.jpeg.asset.json";
import look8 from "@/assets/collections/look8.jpeg.asset.json";
import look9 from "@/assets/collections/look9.jpeg.asset.json";

export const Route = createFileRoute("/")({ component: Index });

const WA = "2348087437117";
const waLink = (msg: string) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

const COLLECTIONS = [
  { img: look1.url, title: "Earth Agbada Royale", desc: "Mocha three-piece Agbada with patterned panel and aso-oke cap.", cat: "senator" },
  { img: look2.url, title: "Heir Apparent", desc: "Children's white Agbada with bead detailing — heritage in miniature.", cat: "senator" },
  { img: look3.url, title: "Young Prince Noir", desc: "Midnight Senator suit with lilac embroidered motifs.", cat: "senator" },
  { img: look4.url, title: "Magenta Maverick", desc: "Boys' tonal magenta two-piece with gilded chest embroidery.", cat: "casual" },
  { img: look5.url, title: "The Patriarch", desc: "Lavender Agbada with deep tonal embroidery — old money refinement.", cat: "senator" },
  { img: look6.url, title: "Royal Magenta Agbada", desc: "Striped three-piece with embroidered yoke and matching fila.", cat: "senator" },
  { img: look7.url, title: "Emerald Soiree", desc: "Women's emerald three-piece kaftan — bespoke for the matriarch.", cat: "casual" },
  { img: look8.url, title: "Mustard Heritage Smart", desc: "Two-tone smart casual top with tailored chinos.", cat: "casual" },
  { img: look9.url, title: "Azure Embroidered Native", desc: "Cobalt native with cascading silver-thread floral embroidery.", cat: "suits" },
];

const FILTERS = [
  { id: "all", label: "All Works" },
  { id: "suits", label: "Bespoke Suits" },
  { id: "senator", label: "Senator Designs" },
  { id: "casual", label: "Smart Casual" },
];

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const dur = 1800;
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Home", "#home"], ["The Designer", "#about"], ["Collections", "#collections"],
    ["Lookbook", "#lookbook"], ["Services", "#services"], ["Reviews", "#reviews"], ["Contact", "#contact"],
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "glass" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="leading-tight">
          <div className="font-display text-xl tracking-[0.25em] gold-text">KELVIN MEGA</div>
          <div className="text-[10px] tracking-[0.4em] text-[var(--cream)]/60 uppercase">Fashion House</div>
        </a>
        <ul className="hidden lg:flex items-center gap-8">
          {links.map(([l, h]) => (
            <li key={h}><a href={h} className="text-sm text-[var(--cream)]/80 hover:text-[var(--gold)] transition tracking-wide uppercase">{l}</a></li>
          ))}
        </ul>
        <a href="#contact" className="hidden lg:inline-flex btn-gold-outline">Book Fitting</a>
        <button className="lg:hidden text-[var(--gold)]" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={open ? "M6 6l12 12M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </nav>
      {open && (
        <div className="lg:hidden glass border-t border-[var(--gold)]/20 px-6 py-6 flex flex-col gap-4">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="text-sm tracking-widest uppercase text-[var(--cream)]/80 hover:text-[var(--gold)]">{l}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-gold-outline justify-center">Book Fitting</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={look6.url} alt="Bespoke senator" className="w-full h-full object-cover object-center opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[var(--gold)]/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[var(--gold-dark)]/20 blur-[140px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-12 gap-10 items-center w-full">
        <div className="lg:col-span-7 animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-[var(--gold)]" />
            <span className="text-[var(--gold)] text-xs tracking-[0.4em] uppercase">Est. Lagos · Bespoke Atelier</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] mb-6">
            Bespoke Tailoring
            <span className="block gold-text italic font-normal">Uncompromising Fit.</span>
          </h1>
          <p className="text-[var(--cream)]/70 text-lg max-w-xl mb-10 leading-relaxed">
            A Lagos atelier crafting heritage Senator couture, bespoke suits, and refined smart-casual for gentlemen who treat dressing as a discipline.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#collections" className="btn-gold">Explore Collections →</a>
            <a href={waLink("Hello Kelvin Mega Fashion, I'd like to book a consultation.")} target="_blank" rel="noreferrer" className="btn-gold-outline">Book Consultation</a>
          </div>
        </div>
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="glass gold-glow p-6 rounded-sm absolute -top-4 -right-4 animate-float max-w-[260px]">
            <div className="text-[var(--gold)] text-xs tracking-[0.3em] mb-2">★ AWARD</div>
            <div className="font-display text-lg leading-snug">Lagos Bespoke Tailor of the Year</div>
            <div className="text-xs text-[var(--cream)]/60 mt-2">Recognition of craft, 2024</div>
          </div>
          <div className="glass gold-border p-6 mt-48 max-w-[280px]">
            <div className="text-xs text-[var(--cream)]/60 uppercase tracking-widest mb-2">Currently Booking</div>
            <div className="font-display text-2xl gold-text">Q3 — 2026</div>
            <div className="text-xs text-[var(--cream)]/60 mt-3">Private fittings by appointment only.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { n: 12, s: "+", l: "Years of Craft" },
    { n: 2400, s: "+", l: "Gentlemen Dressed" },
    { n: 96, s: "%", l: "Return Clients" },
    { n: 18, s: "", l: "Master Tailors" },
  ];
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img src={look5.url} alt="The Designer" className="w-full rounded-sm gold-glow object-cover aspect-[4/5]" />
          <div className="absolute -bottom-6 -right-6 glass gold-border p-5 max-w-[200px]">
            <div className="font-display gold-text text-xl">Kelvin Emwanta</div>
            <div className="text-xs text-[var(--cream)]/60 tracking-widest uppercase mt-1">Creative Director</div>
          </div>
        </div>
        <div>
          <div className="text-[var(--gold)] text-xs tracking-[0.4em] uppercase mb-4">The Designer</div>
          <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
            A House Built on <span className="gold-text italic">Thread, Patience</span> & Heritage.
          </h2>
          <p className="text-[var(--cream)]/75 leading-relaxed mb-5">
            For over a decade, Kelvin Mega has dressed senators, executives, and grooms across West Africa — translating measurement into character, fabric into language.
          </p>
          <p className="text-[var(--cream)]/65 leading-relaxed mb-10">
            Every piece is hand-cut at our Owode atelier. No shortcuts, no factory lines — only the slow, exacting work of bespoke couture.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.l} className="glass p-5 border-l-2 border-[var(--gold)]">
                <div className="font-display text-4xl gold-text"><CountUp to={s.n} suffix={s.s} /></div>
                <div className="text-xs uppercase tracking-widest text-[var(--cream)]/60 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Collections() {
  const [filter, setFilter] = useState("all");
  const items = COLLECTIONS.filter((c) => filter === "all" || c.cat === filter);
  return (
    <section id="collections" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-[var(--gold)] text-xs tracking-[0.4em] uppercase mb-3">Signature Works</div>
          <h2 className="font-display text-4xl md:text-6xl mb-4">The <span className="gold-text italic">Collections</span></h2>
          <p className="text-[var(--cream)]/65 max-w-2xl mx-auto">A curated archive of pieces commissioned by gentlemen of taste — each one bespoke, never repeated.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`px-5 py-2 text-xs tracking-[0.2em] uppercase rounded-sm transition border ${filter === f.id ? "bg-gradient-to-r from-[#F1E2B3] to-[#AA7C11] text-black border-transparent" : "border-[var(--gold)]/30 text-[var(--cream)]/70 hover:border-[var(--gold)]"}`}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c) => (
            <article key={c.title} className="group glass overflow-hidden rounded-sm border border-[var(--gold)]/15 hover:border-[var(--gold)]/60 transition">
              <div className="aspect-[4/5] overflow-hidden bg-black">
                <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl mb-1">{c.title}</h3>
                <p className="text-sm text-[var(--cream)]/60 mb-4">{c.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--gold)]/15">
                  <span className="text-xs uppercase tracking-widest gold-text">Bespoke Only</span>
                  <a href={waLink(`Hello, I'm interested in a fitting for: ${c.title}`)} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest text-[var(--gold)] hover:text-[var(--gold-light)]">Inquire →</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lookbook() {
  const [pos, setPos] = useState(50);
  return (
    <section id="lookbook" className="py-32 bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-[var(--gold)] text-xs tracking-[0.4em] uppercase mb-3">The Lookbook</div>
          <h2 className="font-display text-4xl md:text-6xl mb-4">From Sketch to <span className="gold-text italic">Silhouette</span></h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm gold-glow select-none" onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setPos(((e.clientX - r.left) / r.width) * 100);
          }}>
            <img src={look5.url} alt="finished" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img src={look7.url} alt="sketch" className="absolute inset-0 h-full object-cover" style={{ width: `${100 / (pos/100)}%`, maxWidth: "none" }} />
            </div>
            <div className="absolute top-0 bottom-0 w-px bg-[var(--gold)]" style={{ left: `${pos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--gold)] flex items-center justify-center text-black font-bold">⇌</div>
            </div>
            <div className="absolute top-4 left-4 glass text-xs px-3 py-1 tracking-widest uppercase">Concept</div>
            <div className="absolute top-4 right-4 glass text-xs px-3 py-1 tracking-widest uppercase">Finished</div>
          </div>
          <div className="space-y-6">
            <div className="glass p-7 border-l-2 border-[var(--gold)]">
              <h3 className="font-display text-2xl mb-2 gold-text">Senator Heritage Line</h3>
              <p className="text-sm text-[var(--cream)]/70">Traditional Agbada and Senator wear hand-embroidered in our atelier. Worn by ministers, fathers, and grooms.</p>
            </div>
            <div className="glass p-7 border-l-2 border-[var(--gold)]">
              <h3 className="font-display text-2xl mb-2 gold-text">Accessories & Finishing</h3>
              <p className="text-sm text-[var(--cream)]/70">Hand-rolled pocket squares, beaded necklaces, walking canes, and tailored fila — completing every silhouette.</p>
            </div>
            <blockquote className="border-l-2 border-[var(--gold)] pl-6 italic text-[var(--cream)]/80 font-display text-xl leading-relaxed">
              "A suit is not what you wear. It is the silence you walk into a room with."
              <cite className="block text-xs not-italic tracking-widest uppercase text-[var(--gold)] mt-3">— Kelvin Emwanta</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { t: "Bespoke Suit Couture", d: "Full-canvas suits hand-cut to your figure. Includes pattern drafting, three fittings, and lifetime alterations.", dur: "4–6 weeks" },
    { t: "Traditional Senator Craft", d: "Agbada, Senator, and Kaftan ensembles with bespoke embroidery and matching aso-oke fila.", dur: "3–5 weeks" },
    { t: "Executive Styling Advisory", d: "Private wardrobe consultation for executives and public figures. Capsule planning and fabric curation.", dur: "By Retainer" },
  ];
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "Bespoke Suit Couture", date: "", notes: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `New Fitting Request%0A%0A*Name:* ${form.name}%0A*Email:* ${form.email}%0A*Phone:* ${form.phone}%0A*Service:* ${form.service}%0A*Preferred Date:* ${form.date}%0A*Notes:* ${form.notes}`;
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
  };
  return (
    <section id="services" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-[var(--gold)] text-xs tracking-[0.4em] uppercase mb-3">Atelier Services</div>
          <h2 className="font-display text-4xl md:text-6xl mb-4">The <span className="gold-text italic">Craft</span> We Offer</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {services.map((s, i) => (
            <div key={s.t} className="glass p-8 gold-border hover:gold-glow transition group">
              <div className="font-display text-6xl gold-text opacity-30 mb-4">0{i + 1}</div>
              <h3 className="font-display text-2xl mb-3">{s.t}</h3>
              <p className="text-sm text-[var(--cream)]/65 mb-6 leading-relaxed">{s.d}</p>
              <div className="text-xs tracking-widest uppercase text-[var(--gold)] border-t border-[var(--gold)]/20 pt-4">⏱ {s.dur}</div>
            </div>
          ))}
        </div>

        <div id="contact" className="grid lg:grid-cols-5 gap-10 glass p-8 md:p-12 gold-border">
          <div className="lg:col-span-2">
            <h3 className="font-display text-3xl mb-4">Book a <span className="gold-text italic">Private Fitting</span></h3>
            <p className="text-sm text-[var(--cream)]/65 mb-8">Submit your details and our atelier will reach out via WhatsApp within 24 hours to confirm your appointment.</p>
            <div className="space-y-3 text-sm text-[var(--cream)]/75">
              <div>📍 Owode Ibeshe, Ikorodu, Lagos</div>
              <div>📞 +234 808 743 7117</div>
              <div>✉ bespoke@kelvinmegafashion.com</div>
              <div>🕓 Mon–Sat 09:00–18:00 · Sun by invitation</div>
            </div>
          </div>
          <form onSubmit={submit} className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-black/40 border border-[var(--gold)]/25 px-4 py-3 text-sm focus:border-[var(--gold)] outline-none rounded-sm" />
            <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-black/40 border border-[var(--gold)]/25 px-4 py-3 text-sm focus:border-[var(--gold)] outline-none rounded-sm" />
            <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-black/40 border border-[var(--gold)]/25 px-4 py-3 text-sm focus:border-[var(--gold)] outline-none rounded-sm" />
            <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className="bg-black/40 border border-[var(--gold)]/25 px-4 py-3 text-sm focus:border-[var(--gold)] outline-none rounded-sm">
              {services.map((s) => <option key={s.t}>{s.t}</option>)}
            </select>
            <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="sm:col-span-2 bg-black/40 border border-[var(--gold)]/25 px-4 py-3 text-sm focus:border-[var(--gold)] outline-none rounded-sm" />
            <textarea placeholder="Notes (occasion, style references, fabric preferences)" rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="sm:col-span-2 bg-black/40 border border-[var(--gold)]/25 px-4 py-3 text-sm focus:border-[var(--gold)] outline-none rounded-sm" />
            <button type="submit" className="sm:col-span-2 btn-gold justify-center">Send via WhatsApp →</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { n: "Chief Adekunle O.", r: "The Agbada Kelvin made for my daughter's wedding had every elder asking who tailored it. Heritage craft, undeniably.", role: "Lagos" },
    { n: "Engr. Tunde A.", r: "I have suits from London and Milan. None fit me like the navy three-piece from Mega's atelier. They understand cloth.", role: "Abuja" },
    { n: "Hon. Bayo S.", r: "Discreet, punctual, exceptional. My only tailor for the past six years.", role: "Ibadan" },
  ];
  return (
    <section id="reviews" className="py-32 bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-[var(--gold)] text-xs tracking-[0.4em] uppercase mb-3">Gentlemen Speak</div>
          <h2 className="font-display text-4xl md:text-6xl">Words from <span className="gold-text italic">The Clientele</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.n} className="glass p-8 gold-border">
              <div className="text-[var(--gold)] mb-4 tracking-widest">★★★★★</div>
              <p className="text-[var(--cream)]/80 leading-relaxed mb-6 italic">"{r.r}"</p>
              <div className="border-t border-[var(--gold)]/20 pt-4">
                <div className="font-display text-lg gold-text">{r.n}</div>
                <div className="text-xs tracking-widest uppercase text-[var(--cream)]/55">{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gram() {
  const posts = [look1, look3, look4, look6, look8, look9].map((p, i) => ({
    src: p.url, likes: 1200 + i * 137, comments: 24 + i * 11,
  }));
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-[var(--gold)] text-xs tracking-[0.4em] uppercase mb-3">@kelvinmegafashion</div>
          <h2 className="font-display text-4xl md:text-6xl">Fit <span className="gold-text italic">Diary</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {posts.map((p, i) => (
            <a key={i} href="https://instagram.com/kelvinmegafashion" target="_blank" rel="noreferrer" className="group relative aspect-square overflow-hidden rounded-sm">
              <img src={p.src} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4 text-xs text-[var(--cream)]">
                <span>♥ {p.likes}</span><span>💬 {p.comments}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6 text-center glass p-12 gold-border gold-glow">
        <div className="text-[var(--gold)] text-xs tracking-[0.4em] uppercase mb-3">Private Circle</div>
        <h2 className="font-display text-3xl md:text-5xl mb-4">Join <span className="gold-text italic">Mega Gentlemen Club</span></h2>
        <p className="text-sm text-[var(--cream)]/65 mb-8">First access to seasonal collections, fitting events, and rare fabric drops.</p>
        {ok ? (
          <p className="gold-text font-display text-xl">Welcome aboard, gentleman.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setOk(true); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input required type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 bg-black/40 border border-[var(--gold)]/30 px-4 py-3 text-sm focus:border-[var(--gold)] outline-none rounded-sm" />
            <button className="btn-gold">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--gold)]/15 pt-16 pb-8 bg-black">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="font-display text-xl tracking-[0.25em] gold-text mb-1">KELVIN MEGA</div>
          <div className="text-[10px] tracking-[0.4em] text-[var(--cream)]/50 uppercase mb-4">Fashion House</div>
          <p className="text-sm text-[var(--cream)]/60 leading-relaxed">A Lagos atelier of bespoke menswear, traditional couture, and executive styling.</p>
        </div>
        <div>
          <h4 className="font-display gold-text mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm text-[var(--cream)]/60">
            {["Home","About","Collections","Services","Reviews"].map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-[var(--gold)]">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display gold-text mb-4">Atelier</h4>
          <ul className="space-y-2 text-sm text-[var(--cream)]/60">
            <li>Owode Ibeshe, Ikorodu</li>
            <li>Lagos, Nigeria</li>
            <li>+234 808 743 7117</li>
            <li>bespoke@kelvinmegafashion.com</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display gold-text mb-4">Hours</h4>
          <ul className="space-y-2 text-sm text-[var(--cream)]/60 mb-4">
            <li>Mon–Sat · 09:00–18:00</li>
            <li>Sun · By invitation only</li>
          </ul>
          <div className="flex gap-3">
            {[
              ["IG","https://instagram.com/kelvinmegafashion"],
              ["FB","https://facebook.com/kelvinemwanta"],
              ["TG","https://t.me/kelvinmegafashion"],
            ].map(([l, u]) => (
              <a key={l} href={u} target="_blank" rel="noreferrer" className="w-10 h-10 grid place-items-center border border-[var(--gold)]/30 hover:bg-[var(--gold)] hover:text-black text-xs gold-text">{l}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--gold)]/10 pt-6 text-center text-xs text-[var(--cream)]/40 tracking-widest uppercase">
        © {new Date().getFullYear()} Kelvin Mega Fashion House · Crafted with Devotion in Lagos
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPopup(true), 5000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {popup && (
        <div className="glass gold-border p-4 max-w-[240px] text-sm animate-fade-up relative">
          <button onClick={() => setPopup(false)} className="absolute top-1 right-2 text-[var(--cream)]/50 text-xs">✕</button>
          <div className="font-display gold-text mb-1">Style Advisor</div>
          <p className="text-xs text-[var(--cream)]/70">Need help choosing a fabric or design? Message us — we reply in minutes.</p>
        </div>
      )}
      <a href={waLink("Hello Kelvin Mega Fashion, I'd like to inquire about a bespoke piece.")} target="_blank" rel="noreferrer"
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F1E2B3] to-[#AA7C11] grid place-items-center text-black shadow-[0_10px_40px_-10px_rgba(212,175,55,0.7)] hover:scale-110 transition" aria-label="WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.78 11.78 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.87c0 2.09.55 4.13 1.6 5.93L0 24l6.34-1.66a11.88 11.88 0 0 0 5.7 1.45h.01c6.55 0 11.87-5.32 11.87-11.87 0-3.17-1.24-6.15-3.4-8.44zM12.05 21.8h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.22-3.76.98 1-3.67-.24-.38a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.91-9.88 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.45-4.43 9.91-9.88 9.91zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37s-1.04 1.01-1.04 2.47 1.07 2.86 1.22 3.06c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/></svg>
      </a>
    </div>
  );
}

function Index() {
  return (
    <main className="bg-[#0A0A0A] text-[var(--cream)] overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Collections />
      <Lookbook />
      <Services />
      <Testimonials />
      <Gram />
      <Newsletter />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
