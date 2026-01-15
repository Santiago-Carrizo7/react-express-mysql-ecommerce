import { Route, Routes } from "react-router-dom";
import { Header } from "./Header";
import { Home } from "./Home";
import { Cart } from "./Cart";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}
