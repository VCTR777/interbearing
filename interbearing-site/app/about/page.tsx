import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen bg-[#0B0F19]">
        <About />
      </main>

      <Footer />
    </>
  );
}