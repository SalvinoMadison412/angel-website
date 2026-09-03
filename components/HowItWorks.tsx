import { Radar, Send, Network, Users, ShieldCheck } from "lucide-react";
import Container from "./Container";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    icon: Radar,
    title: "Impact Detected",
    body: "Atom's 6-axis IMU registers the impact and sends the reading to the paired Angel app over Bluetooth.",
  },
  {
    n: "02",
    icon: ShieldCheck,
    title: "You Get A Countdown",
    body: "The app classifies the event and starts a short countdown, so you can cancel if it was a false alarm.",
  },
  {
    n: "03",
    icon: Send,
    title: "Contacts Alerted",
    body: "If you don't cancel, the app messages and calls your emergency contacts with your live location and a maps link.",
  },
  {
    n: "04",
    icon: Network,
    title: "Network Activated",
    body: "On the roadmap: the same alert reaches nearby responders, tow services, and hospitals as Angel brings partners online.",
  },
  {
    n: "05",
    icon: Users,
    title: "Help Coordinated",
    body: "The goal — a verified incident routed to the closest available help before anyone has to make a call.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative border-b border-divider bg-bg-elevated py-16 sm:py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionLabel index="05">What Happens In A Crash</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            The seconds after a crash, handled automatically.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-0 md:grid-cols-5">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08} className="relative">
              <div
                className={`h-full border-t border-divider p-6 pr-8 md:border-t-0 md:border-l ${
                  i === 0 ? "md:border-l-0" : ""
                }`}
              >
                <span className="font-mono text-xs text-accent">[ {step.n} ]</span>
                <div className="mt-6 flex h-11 w-11 items-center justify-center border border-glass text-accent">
                  <step.icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className="mt-6 font-heading text-lg font-bold text-white">{step.title.toUpperCase()}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
