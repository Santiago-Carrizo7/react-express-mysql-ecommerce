import { Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/AuthStore.js";
import { useEffect } from "react";
import { Header } from "./components/header/Header.js";
import { ProtectedRoute } from "./components/ProtectedRoute.js";
import { Home } from "./pages/home/Home.js";
import { Cart } from "./pages/cart/Cart.js";
import { Login } from "./pages/login/Login.js";
import { ProductsPage } from "./pages/productsPage/ProductsPage.js";
import { Register } from "./pages/register/Register.js";
import { Footer } from "./components/footer/Footer.js";
import { Success } from "./components/success/Success.js";
import { Pending } from "./components/pending/Pending.js";
import { Failure } from "./components/failure/Failure.js";

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
        <Route path="/success" element={<Success />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/failure" element={<Failure />} />
      </Routes>
      <Footer />
    </>
  );
}
