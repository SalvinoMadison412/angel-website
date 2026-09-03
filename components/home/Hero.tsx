"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Container from "../Container";
import Button from "../Button";
import ParticleSphere from "./ParticleSphere";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-b border-divider pt-[72px]">
      <div className="dot-grid-faint fade-mask-b pointer-events-none absolute inset-0" />
      <motion.div
        className="pointer-events-none absolute -right-40 top-1/4 h-[560px] w-[560px] rounded-full bg-accent/10 blur-[150px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-white/5 blur-[120px]" />

      <Container className="relative grid grid-cols-1 items-center gap-10 py-16 sm:gap-14 sm:py-24 lg:grid-cols-[1fr_1fr] lg:gap-8 lg:py-0">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest2 text-accent"
          >
            <span className="h-px w-6 bg-accent" />[ 01 ] ROAD SAFETY INFRASTRUCTURE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-heading text-[38px] font-bold leading-[1.1] tracking-tight text-white sm:text-[48px] lg:text-[56px]"
          >
            The Network That{" "}
            <span className="text-gradient-accent">Responds Before Help Knows It's Needed.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-7 max-w-lg font-body text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            Every hour, 20 people die on Indian roads. Angel is building the network that detects your crash and
            gets help moving — starting with automatic alerts to your emergency contacts, and growing toward the
            responders and nearby motorists who can reach you first.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button href="/network" size="lg" icon>
              Explore the Network
            </Button>
            <Button href="/product" variant="secondary" size="lg">
              Pre-order Now
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-14 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-widest2 text-ink-dim sm:flex"
          >
            <ChevronDown size={14} className="animate-bounce text-accent" />
            Scroll to explore the platform
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative h-[300px] w-full sm:h-[420px] lg:-my-24 lg:-mr-32 lg:h-[760px]"
        >
          <ParticleSphere className="absolute inset-0 h-full w-full" />
        </motion.div>
      </Container>
    </section>
  );
}
