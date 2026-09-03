import Container from "../Container";
import SectionLabel from "../SectionLabel";
import Reveal from "../Reveal";
import NetworkDiagram from "../NetworkDiagram";

export default function NetworkDiagramSection() {
  return (
    <section className="border-b border-divider bg-bg-elevated py-14 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionLabel index="MAP">The Network Design</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            Drivers and partners, connected through one infrastructure hub.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 sm:mt-14">
          <div className="bracket-corner border border-glass bg-glass-fill p-4 sm:p-10">
            {/* the diagram's 800-unit viewBox squashes its 9px labels below
                legibility under ~600px, so scroll it sideways instead */}
            <div className="-mx-1 overflow-x-auto px-1">
              <NetworkDiagram variant="full" className="w-full min-w-[600px]" />
            </div>
          </div>
        </Reveal>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-widest2 text-ink-dim sm:hidden">
          Scroll the diagram sideways →
        </p>
      </Container>
    </section>
  );
}
