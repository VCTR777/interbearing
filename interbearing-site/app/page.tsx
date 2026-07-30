import About from "./components/About";
import Brands from "./components/Brands";
import Categories from "./components/Categories";
import Features from "./components/Features";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import PopularProducts from "./components/PopularProducts";

export default function Home() {
  return (
    <main className="bg-[#0B0F19] text-white">
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <PopularProducts />
      <Brands />
      <About />
      <HowItWorks />
    </main>
  );
}