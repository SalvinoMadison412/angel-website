import { Package, Smartphone, Network } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Container from "../Container";
import SectionLabel from "../SectionLabel";
import Reveal from "../Reveal";

const steps = [
  { icon: Package, n: "01", title: "Buy Device", body: "Order Atom and mount it in your vehicle in minutes." },
  { icon: Smartphone, n: "02", title: "Install Angel App", body: "Pair your device over Bluetooth and add your emergency contacts." },
  { icon: Network, n: "03", title: "You're Covered", body: "Atom watches for a crash. If one happens and you can't respond, the app alerts your contacts with your location automatically." },
];

export default function NetworkConnection() {
  return (
    <section className="border-b border-divider bg-bg-elevated py-14 sm:py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionLabel index="ENTRY POINT">Product → Network</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            When you buy Atom, you're not just buying a device.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ink-muted">
            You're backing the Angel network. Every Atom sold is one more rider on it — and the foundation for
            the responder, tow-fleet, and hospital connections Angel is working to bring online.
          </p>
        </Reveal>

        <div className="mt-16 flex flex-col items-stretch gap-4 md:flex-row md:items-center">
          {steps.map((s, i) => (
            <div key={s.n} className="flex flex-1 items-center gap-4">
              <Reveal delay={i * 0.1} className="flex-1">
                <div className="h-full border border-glass bg-bg p-7">
                  <span className="font-mono text-xs text-accent">[ {s.n} ]</span>
                  <div className="mt-5 flex h-11 w-11 items-center justify-center border border-glass text-accent">
                    <s.icon size={20} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-5 font-heading text-base font-bold text-white">{s.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              </Reveal>
              {i < steps.length - 1 && (
                <ArrowRight size={20} className="hidden shrink-0 text-accent md:block" strokeWidth={1.5} />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
