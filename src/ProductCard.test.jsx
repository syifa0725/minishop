import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "./components/ProductCard";
import { KeranjangProvider } from "./Context/KeranjangContext";

function renderDenganProvider(ui) {
  return render(
    <MemoryRouter>
      <KeranjangProvider>
        {ui}
      </KeranjangProvider>
    </MemoryRouter>
  );
}

describe("ProductCard", () => {
  it("menampilkan nama produk dengan benar", () => {
    const produk = {
      id: 1,
      nama: "Kaos Polos",
      harga: 75000,
      gambar: "/img/kaos.jpg",
    };

    renderDenganProvider(
      <ProductCard produk={produk} />
    );

    expect(
      screen.getByText("Kaos Polos")
    ).toBeInTheDocument();
  });

  it("menampilkan harga produk dengan benar", () => {
    const produk = {
      id: 2,
      nama: "Topi",
      harga: 40000,
      gambar: "/img/topi.jpg",
    };

    renderDenganProvider(
      <ProductCard produk={produk} />
    );

    expect(
      screen.getByText("Rp 40.000")
    ).toBeInTheDocument();
  });
});