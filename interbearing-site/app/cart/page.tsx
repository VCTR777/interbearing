import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CartPageClient from "./CartPageClient";

export const metadata = {
  title: "Кошик | INTERBEARING",
  description: "Оформлення замовлення підшипників INTERBEARING.",
};

export default function CartPage() {
  return (
    <>
      <Navbar />
      <CartPageClient />
      <Footer />
    </>
  );
}
