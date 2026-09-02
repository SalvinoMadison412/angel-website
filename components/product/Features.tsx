import Image from "next/image";
import Container from "../Container";
import SectionLabel from "../SectionLabel";
import Reveal from "../Reveal";

const images = [
  {
    src: "/product/atom.png",
    alt: "Atom crash-detection device",
  },
  {
    src: "/product/atom-features.png",
    alt: "Atom features: automatic crash detection, cancel false alarms, emergency contacts, wide temperature range, Angel network, 2-year warranty, 6 months premium free",
  },
];

export default function Features() {
  return (
    <section className="border-b border-divider bg-bg py-28">
      <Container>
        <Reveal>
          <SectionLabel index="FEATURES">What Atom Does</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-2xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
            Every feature here is one we can stand behind.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {images.map((img, i) => (
            <Reveal key={img.src} delay={0.1 + i * 0.06}>
              <div className="bracket-corner overflow-hidden border border-glass bg-glass-fill">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1254}
                  height={1254}
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
