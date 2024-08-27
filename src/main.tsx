import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Index from "./pages/index.tsx";
import CartContext from "./context/cart.tsx";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Checkout from "./pages/checkout.tsx";
import MainLayout from "./layouts/main.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartContext>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </CartContext>
  </React.StrictMode>
);
