import { useCart } from "./CartStore.jsx";
import { Link } from "react-router-dom";

export function Header() {
  const { cart } = useCart();

  return (
    <header>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/cart"> Carrito - {cart.length}</Link>
      </nav>
    </header>
  );
}
