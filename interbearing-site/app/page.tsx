import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Categories from "./components/Categories";
import Brands from "./components/Brands";
import About from "./components/About";

export default function Home() {
  return (
    <main className="bg-[#0B0F19] text-white">
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <Brands />
      <About />
    </main>
  );
}