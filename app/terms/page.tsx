import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionLabel from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "Terms of Service | Angel",
};

export default function TermsPage() {
  return (
    <section className="border-b border-divider pt-[72px]">
      <Container className="max-w-3xl py-14 sm:py-20 lg:py-24">
        <SectionLabel index="LEGAL">Terms of Service</SectionLabel>
        <h1 className="mt-5 font-heading text-4xl font-bold text-white">Terms of Service</h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest2 text-ink-dim">Last updated: January 2026</p>

        <div className="mt-12 space-y-8 font-body text-sm leading-relaxed text-ink-muted sm:text-base">
          <p>
            By purchasing or using Atom and the Angel companion app, you agree to these terms. Atom is designed
            to assist in detecting and responding to vehicle collisions, but it is not a substitute for safe
            driving practices, seatbelt use, or existing vehicle safety systems.
          </p>
          <p>
            Atom relies on a Bluetooth connection to your phone and the phone's own mobile or Wi-Fi network to
            send alerts. Angel makes commercially reasonable efforts to provide timely and accurate crash
            detection and alerting, but cannot guarantee alert delivery or response time in every circumstance —
            including when your phone is off, out of Bluetooth range, or without network coverage, or during
            extreme device damage.
          </p>
          <p>
            Devices are covered by a 2-year limited warranty against manufacturing defects and may be returned
            within 30 days of delivery for a full refund, provided the device is undamaged and in its original
            packaging.
          </p>
          <p>
            Continued use of Angel's products and services following any update to these terms constitutes
            acceptance of the revised terms.
          </p>
        </div>
      </Container>
    </section>
  );
}
