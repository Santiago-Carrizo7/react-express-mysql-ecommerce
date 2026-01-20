import { Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/AuthStore.jsx";
import { useEffect } from "react";
import { Header } from "./components/Header.jsx";
import { Home } from "./pages/Home.jsx";
import { Cart } from "./pages/Cart.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";

export default function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []); 
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
