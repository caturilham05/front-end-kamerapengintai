import React from "react";
import { Routes, Route, useLocation} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginComponents from "./components/Auth/LoginComponents";
import NavbarComponents from "./components/NavbarComponents";
import HomeComponents from "./components/HomeComponents";
import RegisterComponents from "./components/Auth/RegisterComponents";
import ProductDetailComponents from "./components/Products/ProductDetailComponents";
import ProductRelatedComponents from "./components/Products/ProductRelatedComponents";
import ProductCartComponents from "./components/Products/ProductCartComponents";
import UserProfileComponents from "./components/Auth/UserProfileComponents";
import ProductCartCheckoutComponents from "./components/Products/ProductCartCheckoutComponents";
import "./App.css";

function App() {
  let { pathname } = useLocation();
  return (
    <div>
      {pathname === "/login" || pathname === "/register" ? null : <NavbarComponents />}
      <Routes>
        <Route path="/" element={<HomeComponents />} />
        <Route path="/login" element={<LoginComponents />} />
        <Route path="/register" element={<RegisterComponents />} />
        <Route path="/user" element={<UserProfileComponents />} />
        <Route path="/products/:productId" element={<ProductDetailComponents />} />
        <Route path="/product_related/:catId" element={<ProductRelatedComponents />} />
        <Route path="/cart/:userId" element={<ProductCartComponents />} />
        <Route path="/checkout" element={<ProductCartCheckoutComponents />} />
      </Routes>
    </div>
  );
}

export default App;
