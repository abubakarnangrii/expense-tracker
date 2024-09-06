"use client";
import Image from "next/image";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-slate-50  dark:bg-meta-4">
      <Header />
      <Hero/>
      <Footer />
    </div>
  );
}
