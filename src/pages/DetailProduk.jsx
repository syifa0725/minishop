import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useKeranjang } from "../Context/KeranjangContext";

function DetailProduk() {
  const { id } = useParams();
  const { tambahKeKeranjang } = useKeranjang();

  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }

        return res.json();
      })
      .then((data) => {
        setProduk({
          id: data.id,
          nama: data.title,
          harga: data.price,
          gambar: data.image,
          kategori: data.category
        });

        setLoading(false);
      })
      .catch(() => {
        setError("Gagal mengambil data produk.");
        setLoading(false);
      });
  }, [id]);

  function handleTambah() {
    tambahKeKeranjang(produk);
    alert("Produk berhasil ditambahkan ke keranjang!");
  }

  if (loading) return <p>Memuat produk...</p>;
  if (error) return <p>{error}</p>;
  if (!produk) return <h2>Produk tidak ditemukan</h2>;

  return (
    <div className="detail-produk">
      <img
        src={produk.gambar}
        alt={produk.nama}
      />

      <div>
        <h2>{produk.nama}</h2>

        <p>
          Harga: Rp{" "}
          {produk.harga.toLocaleString("id-ID")}
        </p>

        <p>
          Produk ini tersedia di MiniShop.
        </p>

        <button onClick={handleTambah}>
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}

export default DetailProduk;