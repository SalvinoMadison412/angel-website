import Container from "../Container";
import SectionLabel from "../SectionLabel";
import Reveal from "../Reveal";

const milestones = [
  { year: "2023", title: "Founded", body: "Angel starts after a near-miss highlights the gap between vehicle safety and post-crash response." },
  { year: "2024", title: "First Prototype", body: "Atom's sensor-fusion detection engine moves from concept to a working prototype." },
  { year: "2025", title: "Detection Tuning", body: "Crash-detection logic refined against real-world riding data ahead of launch." },
  { year: "2026", title: "Pre-order & Pilot", body: "Atom opens for pre-order. Manufacturing and certification are in progress." },
];

export default function Timeline() {
  return (
    <section className="border-b border-divider bg-bg py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionLabel index="TIMELINE">Milestones</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            From a near-miss to a global safety layer.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-0 md:grid-cols-4">
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.08}>
              <div className={`h-full border-t border-divider p-6 pr-8 md:border-t-0 md:border-l ${i === 0 ? "md:border-l-0" : ""}`}>
                <span className="font-heading text-2xl font-bold text-accent">{m.year}</span>
                <h3 className="mt-4 font-heading text-base font-bold text-white">{m.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
