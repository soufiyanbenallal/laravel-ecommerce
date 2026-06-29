import { Head } from "@inertiajs/react";
import atelierImg from "@/assets/atelier.jpg";
import { MapPin } from "lucide-react";

export default function About() {
  return (
    <div>
      <Head title="The Atelier — Atelier Nord">
        <meta name="description" content="How Atelier Nord works with independent makers across Europe and Japan." />
      </Head>
      
      <section className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Est. 2017 · Lisbon</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-7xl">
          We started Atelier Nord <br />
          because <em className="text-accent">good things</em> <br /> were getting harder to find.
        </h1>
        <div className="mt-12 grid gap-10 text-[15px] leading-relaxed text-foreground/85 md:grid-cols-2">
          <p>
            In 2017, we left careers in fashion and architecture to open a small studio above a bakery in Príncipe Real. The idea was simple: design fewer things, work directly with the people who make them, and sell them ourselves.
          </p>
          <p>
            Six years later, Atelier Nord is still just eleven people. We release two collections a year, never discount, and visit every workshop we work with. Most of our customers we know by first name.
          </p>
        </div>
      </section>

      <section className="relative">
        <img
          src={atelierImg}
          alt="Atelier interior, Lisbon"
          loading="lazy"
          width={1400}
          height={1000}
          className="aspect-[16/8] w-full object-cover"
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Our makers</p>
        <h2 className="mt-3 font-display text-4xl md:text-5xl">Eleven workshops, six countries.</h2>
        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {[
            { place: "Hawick, Scotland", who: "Borders Knitwear Co. — three generations of cashmere knitters working on 1970s Bentley-Cotton frames." },
            { place: "Florence, Italy", who: "Officina del Cuoio — a four-person leather workshop near the Arno, run by Marco and his daughters." },
            { place: "Setagaya, Tokyo", who: "Kaneko-tōki — Hideo Kaneko throws and fires every piece in his garden kiln." },
            { place: "Porto, Portugal", who: "Costura Atelier — a tailoring workshop our neighbour Inês founded in 2009." },
            { place: "Bagno a Ripoli, Italy", who: "Conceria Galli — vegetable tannery still using oak and chestnut bark." },
            { place: "Saint-Claude, France", who: "Maison Lunet — gold-plated eyewear hand-assembled in the Jura mountains." },
          ].map((w) => (
            <div key={w.place} className="border-t border-border/60 pt-5">
              <div className="flex items-center gap-2 text-sm text-accent">
                <MapPin className="h-4 w-4" strokeWidth={1.5} />
                {w.place}
              </div>
              <p className="mt-3 text-foreground/80">{w.who}</p>
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
              <div className="font-display text-6xl text-accent">{s.n}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.16em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
