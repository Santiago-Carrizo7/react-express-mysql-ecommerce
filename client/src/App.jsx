import { Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/AuthStore.jsx";
import { useEffect } from "react";
import { Header } from "./components/header/Header.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { Home } from "./pages/home/Home.jsx";
import { Cart } from "./pages/cart/Cart.jsx";
import { Login } from "./pages/login/Login.jsx";
import { ProductsPage } from "./pages/productsPage/ProductsPage.jsx";
import { Register } from "./pages/register/Register.jsx";
import { Footer } from "./components/footer/Footer.jsx";

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
      <Footer />
    </>
  );
}
