import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  KeranjangProvider,
  useKeranjang,
} from "../Context/KeranjangContext";

function Sample() {
  const {
    item,
    tambahKeKeranjang,
  } = useKeranjang();

  const produk = {
    id: 1,
    nama: "Kaos Polos",
    harga: 75000,
    gambar: "x.jpg",
  };

  return (
    <div>
      <button onClick={() => tambahKeKeranjang(produk)}>
        Tambah
      </button>

      <p>Jumlah: {item.length}</p>
      <p>
        {item[0]?.nama || ""}
      </p>
      <p>
        Qty: {item[0]?.qty || 0}
      </p>
    </div>
  );
}

describe("KeranjangContext", () => {
  it("menambahkan produk ke keranjang", () => {
    localStorage.clear();

    render(
      <KeranjangProvider>
        <Sample />
      </KeranjangProvider>
    );

    fireEvent.click(
      screen.getByText("Tambah")
    );

    expect(
      screen.getByText("Jumlah: 1")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Kaos Polos")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Qty: 1")
    ).toBeInTheDocument();
  });
});