import React from "react";
import { Link } from "react-router-dom";
import { useKeranjang } from "../Context/KeranjangContext";

function ProductCard({ produk }) {
  const { tambahKeKeranjang } = useKeranjang();

  return (
    <div className="produk-card">
      <img
        src={produk.image || produk.gambar}
        alt={produk.title || produk.nama}
      />

      <h3>
        {produk.title || produk.nama}
      </h3>

      <p>
        Rp{" "}
        {Number(
          produk.price ?? produk.harga
        ).toLocaleString("id-ID")}
      </p>

      <Link to={`/produk/${produk.id}`}>
        <button>
          Lihat Detail
        </button>
      </Link>

      <button
        onClick={() =>
          tambahKeKeranjang(produk)
        }
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
}

export default ProductCard;