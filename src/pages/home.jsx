import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";

const PRODUK_PER_HALAMAN = 8;

function Home() {
  const [produk, setProduk] = useState([]);
  const [kategoriProduk, setKategoriProduk] = useState(["Semua"]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [kataKunci, setKataKunci] = useState("");
  const [kategori, setKategori] = useState("Semua");

  const [halaman, setHalaman] = useState(1);

  useEffect(() => {
    async function ambilData() {
      try {
        setLoading(true);
        setError("");

        const [produkRes, kategoriRes] =
          await Promise.all([
            fetch("https://fakestoreapi.com/products"),
            fetch(
              "https://fakestoreapi.com/products/categories"
            ),
          ]);

        if (!produkRes.ok || !kategoriRes.ok) {
          throw new Error();
        }

        const dataProduk = await produkRes.json();
        const dataKategori = await kategoriRes.json();

        const produkFormat = dataProduk.map((p) => ({
          id: p.id,
          nama: p.title,
          harga: p.price,
          gambar: p.image,
          kategori: p.category,
        }));

        setProduk(produkFormat);
        setKategoriProduk([
          "Semua",
          ...dataKategori,
        ]);
      } catch {
        setError(
          "Gagal mengambil data produk."
        );
      } finally {
        setLoading(false);
      }
    }

    ambilData();
  }, []);

  const produkTersaring = produk.filter((p) => {
    const cocokNama = p.nama
      .toLowerCase()
      .includes(kataKunci.toLowerCase());

    const cocokKategori =
      kategori === "Semua" ||
      p.kategori === kategori;

    return cocokNama && cocokKategori;
  });

  const totalHalaman = Math.max(
    1,
    Math.ceil(
      produkTersaring.length /
        PRODUK_PER_HALAMAN
    )
  );

  const produkHalamanIni =
    produkTersaring.slice(
      (halaman - 1) *
        PRODUK_PER_HALAMAN,
      halaman *
        PRODUK_PER_HALAMAN
    );

  function handleKataKunci(e) {
    setKataKunci(e.target.value);
    setHalaman(1);
  }

  function handleKategori(e) {
    setKategori(e.target.value);
    setHalaman(1);
  }

  if (loading) {
    return (
      <p className="text-center">
        Memuat produk...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">
        Daftar Produk
      </h2>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          className="border rounded-lg px-3 py-2 w-full md:w-80"
          type="text"
          placeholder="Cari produk..."
          value={kataKunci}
          onChange={handleKataKunci}
        />

        <select
          className="border rounded-lg px-3 py-2"
          value={kategori}
          onChange={handleKategori}
        >
          {kategoriProduk.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      {produkHalamanIni.length === 0 ? (
        <p>Produk tidak ditemukan.</p>
      ) : (
        <div className="grid-produk">
          {produkHalamanIni.map((p) => (
            <ProductCard
              key={p.id}
              produk={p}
            />
          ))}
        </div>
      )}

      {produkTersaring.length > 0 && (
        <div className="pagination">
          <button
            onClick={() =>
              setHalaman((h) => h - 1)
            }
            disabled={halaman === 1}
          >
            Sebelumnya
          </button>

          <span>
            Halaman {halaman} dari{" "}
            {totalHalaman}
          </span>

          <button
            onClick={() =>
              setHalaman((h) => h + 1)
            }
            disabled={
              halaman === totalHalaman
            }
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;