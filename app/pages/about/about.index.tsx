import atelierImg from "@/assets/atelier.jpg";
import { MapPin } from "lucide-react";

export default function About() {
  return (
    <div className="bg-background">
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Est. 2017 · Casablanca & Lisbon</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-7xl font-light">
          We started KENZ Maison <br />
          because <em className="text-accent not-italic">good things</em> <br /> were getting harder to find.
        </h1>
        <div className="mt-12 grid gap-10 text-[15px] leading-relaxed text-foreground/85 md:grid-cols-2 font-light">
          <p>
            In 2017, we left careers in fashion and architecture to open a small design studio. The idea was simple: design fewer things, work directly with the artisan workshops who craft them, and sell them ourselves.
          </p>
          <p>
            Six years later, KENZ Maison is still just eleven people. We release small-batch capsules twice a year, never discount, and visit every workshop we work with. Most of our customers we know by first name.
          </p>
        </div>
      </section>

      <section className="relative">
        <img
          src={atelierImg}
          alt="Atelier interior, Lisbon"
          loading="lazy"
          className="aspect-[16/8] w-full object-cover"
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">Our makers</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl font-light">Eleven workshops, six countries.</h2>
        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {[
            { place: "Hawick, Scotland", who: "Borders Knitwear Co. — three generations of cashmere knitters working on 1970s Bentley-Cotton frames." },
            { place: "Fez, Morocco", who: "Officina del Cuoio — a four-person leather workshop specializing in vegetable-tanned box calf loafers." },
            { place: "Florence, Italy", who: "Officina del Cuoio — run by Marco and his daughters crafting premium Goodyear welted boots." },
            { place: "Porto, Portugal", who: "Costura Atelier — a tailoring workshop our neighbour Inês founded in 2009." },
            { place: "Bagno a Ripoli, Italy", who: "Conceria Galli — vegetable tannery still using oak and chestnut bark." },
            { place: "Saint-Claude, France", who: "Maison Lunet — gold-plated eyewear hand-assembled in the Jura mountains." },
          ].map((w) => (
            <div key={w.place} className="border-t border-border/60 pt-5">
              <div className="flex items-center gap-2 text-sm text-accent">
                <MapPin className="h-4 w-4" strokeWidth={1.5} />
                {w.place}
              </div>
              <p className="mt-3 text-foreground/80 font-light text-[14px] leading-relaxed">{w.who}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-4">
          {[
            { n: "11", l: "people in the studio" },
            { n: "06", l: "countries we work in" },
            { n: "02", l: "collections per year" },
            { n: "60d", l: "to return anything" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-6xl text-accent font-light">{s.n}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
