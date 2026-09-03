import Container from "../Container";
import SectionLabel from "../SectionLabel";
import Reveal from "../Reveal";
import Accordion from "../Accordion";

const faqs = [
  {
    q: "How does Atom tell a real crash apart from a rough road?",
    a: "Atom combines accelerometer, gyroscope, barometer and GPS readings and looks at impact force, deceleration and orientation change together, rather than reacting to a single spike. We're still benchmarking detection accuracy and speed, and we'll publish those numbers once they hold up — we're not going to claim a figure we can't back.",
  },
  {
    q: "Does Atom need my phone to work?",
    a: "Yes. Atom connects to your phone over Bluetooth, and the companion app relays crash alerts to your emergency contacts and the Angel network. If your phone is off or out of Bluetooth range at the moment of a crash, the alert can't be sent — this is a Bluetooth device, not a standalone cellular one.",
  },
  {
    q: "Is there a monthly subscription fee?",
    a: "No. Crash detection and automatic alerting work with no subscription. Every Atom also includes 6 months of premium monitoring free; after that, premium (extended history and additional monitoring features) is optional and the core safety features keep working without it.",
  },
  {
    q: "Do I need to charge Atom?",
    a: "No. Atom has no internal battery. It wires into your motorcycle or moped's battery and draws a small amount of power to stay on — there's nothing to plug in or recharge.",
  },
  {
    q: "Can I cancel a false alarm?",
    a: "Yes. When Atom detects a possible crash it starts a short countdown before sending an alert, so you have time to confirm you're okay and cancel it from the companion app.",
  },
  {
    q: "What's the warranty and return policy?",
    a: "Every Atom ships with a 2-year warranty covering hardware defects, plus a 30-day return window if it's not the right fit.",
  },
];

export default function ProductFAQ() {
  return (
    <section id="faq" className="border-b border-divider bg-bg-elevated py-16 sm:py-20 lg:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionLabel index="FAQ">Common Questions</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            Answers before you ask.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <Accordion items={faqs} />
        </Reveal>
      </Container>
    </section>
  );
}
