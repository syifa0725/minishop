import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/home";
import DetailProduk from "./pages/DetailProduk";
import FormLogin from "./pages/FormLogin";
import FormRegister from "./pages/FormRegister";
import NotFound from "./pages/NotFound";

const Keranjang = lazy(() => import("./pages/keranjang"));
const Riwayat = lazy(() => import("./pages/riwayat"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/produk/:id" element={<DetailProduk />} />
          <Route path="/login" element={<FormLogin />} />
          <Route path="/register" element={<FormRegister />} />

          <Route
            path="/keranjang"
            element={
              <ProtectedRoute>
                <Suspense fallback={<p>Memuat...</p>}>
                  <Keranjang />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/riwayat"
            element={
              <ProtectedRoute>
                <Suspense fallback={<p>Memuat...</p>}>
                  <Riwayat />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;