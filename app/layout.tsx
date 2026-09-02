import type { Metadata } from "next";
import { Space_Mono, Oswald, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PitchDeckModal from "@/components/PitchDeckModal";
import Scene3D from "@/components/Scene3D";
import { PitchDeckModalProvider } from "@/lib/PitchDeckModalContext";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const spaceGrotesk = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Angel — The Network That Responds Before Help Knows It's Needed",
  description:
    "Angel is the infrastructure layer for road safety — a two-sided network connecting drivers in distress with emergency responders, repair fleets, hospitals, and insurers in real time.",
  keywords: [
    "Angel",
    "Atom",
    "road safety network",
    "crash detection",
    "emergency response infrastructure",
    "two-sided marketplace",
  ],
  openGraph: {
    title: "Angel — The Network That Responds Before Help Knows It's Needed",
    description:
      "A real-time network connecting drivers, emergency responders, repair fleets, hospitals, and insurers — automatically.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${spaceGrotesk.variable} ${openSans.variable}`}
    >
      <body className="font-body text-ink antialiased">
        <Scene3D />
        <PitchDeckModalProvider>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <div className="relative z-10">
            <Footer />
          </div>
          <PitchDeckModal />
        </PitchDeckModalProvider>
      </body>
    </html>
  );
}
