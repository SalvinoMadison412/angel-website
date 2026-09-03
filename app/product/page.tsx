import type { Metadata } from "next";
import ProductHero from "@/components/product/ProductHero";
import NetworkConnection from "@/components/product/NetworkConnection";
import Features from "@/components/product/Features";
import SpecsTable from "@/components/product/SpecsTable";
import DevelopmentNote from "@/components/product/DevelopmentNote";
import InTheBox from "@/components/product/InTheBox";
import ProductFAQ from "@/components/product/ProductFAQ";
import BuyCTA from "@/components/product/BuyCTA";

export const metadata: Metadata = {
  title: "Atom — The Hardware That Joins You to the Network | Angel",
  description:
    "Atom is a crash-detection device that pairs with the Angel app and alerts your emergency contacts with your location automatically. The first piece of the Angel safety network. Pre-order now.",
};

export default function ProductPage() {
  return (
    <>
      <ProductHero />
      <NetworkConnection />
      <Features />
      <SpecsTable />
      <DevelopmentNote />
      <InTheBox />
      <ProductFAQ />
      <BuyCTA />
    </>
  );
}
