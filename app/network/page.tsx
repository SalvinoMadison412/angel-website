import type { Metadata } from "next";
import NetworkHero from "@/components/network/NetworkHero";
import NetworkDiagramSection from "@/components/network/NetworkDiagramSection";
import HowNetworkScales from "@/components/network/HowNetworkScales";
import MarketExpansion from "@/components/network/MarketExpansion";
import TechInfrastructure from "@/components/network/TechInfrastructure";
import PartnerIntegration from "@/components/network/PartnerIntegration";

export const metadata: Metadata = {
  title: "The Network — Angel Platform Architecture",
  description:
    "Angel is building a real-time matching network to connect every rider on the road to help the moment they need it, on a cloud-native, AI-first stack.",
};

export default function NetworkPage() {
  return (
    <>
      <NetworkHero />
      <NetworkDiagramSection />
      <HowNetworkScales />
      <MarketExpansion />
      <TechInfrastructure />
      <PartnerIntegration />
    </>
  );
}
