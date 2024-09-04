import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="bg-slate-50  dark:bg-meta-4">
      <Header />
      <Hero/>
      <Footer />
    </div>
  );
}
