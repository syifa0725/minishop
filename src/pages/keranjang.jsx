import { useKeranjang } from "../Context/KeranjangContext";

function Keranjang() {
  const {
    item,
    tambahKeKeranjang,
    kurangiJumlah,
    hapusDariKeranjang,
  } = useKeranjang();

  const totalHarga = item.reduce(
    (total, produk) =>
      total + Number(produk.harga) * Number(produk.qty),
    0
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Keranjang Belanja
      </h2>

      {item.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 mb-4">
            Keranjang masih kosong.
          </p>
        </div>
      ) : (
        <>
          <div className="grid-produk">
            {item.map((produk) => (
              <div className="produk-card" key={produk.id}>
                <img
                  src={produk.gambar || produk.image}
                  alt={produk.nama || produk.title}
                />

                <h3>
                  {produk.nama || produk.title}
                </h3>

                <p>
                  Rp{" "}
                  {Number(produk.harga || produk.price).toLocaleString(
                    "id-ID"
                  )}
                </p>

                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    onClick={() =>
                      kurangiJumlah(produk.id)
                    }
                    className="w-9 h-9 rounded-lg bg-gray-200 text-gray-800 font-bold hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="font-semibold">
                    {produk.qty}
                  </span>

                  <button
                    onClick={() =>
                      tambahKeKeranjang(produk)
                    }
                    className="w-9 h-9 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700"
                  >
                    +
                  </button>
                </div>

                <p className="text-gray-600">
                  Subtotal:{" "}
                  <strong>
                    Rp{" "}
                    {(
                      Number(produk.harga || produk.price) *
                      Number(produk.qty)
                    ).toLocaleString("id-ID")}
                  </strong>
                </p>

                <button
                  onClick={() =>
                    hapusDariKeranjang(produk.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-5 mt-6 text-right">
            <h3 className="text-xl font-bold">
              Total: Rp{" "}
              {totalHarga.toLocaleString("id-ID")}
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default Keranjang;