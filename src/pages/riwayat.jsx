import { useEffect, useState } from "react";

function Riwayat() {
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("riwayatPesanan");

    if (data) {
      try {
        setRiwayat(JSON.parse(data));
      } catch {
        setRiwayat([]);
      }
    }
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Riwayat Pesanan
      </h2>

      {riwayat.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">
            Belum ada riwayat pesanan.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {riwayat.map((pesanan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-5"
            >
              <h3 className="font-bold mb-3">
                Pesanan #{index + 1}
              </h3>

              {pesanan.item?.map((produk) => (
                <div
                  key={produk.id}
                  className="flex justify-between border-b py-2"
                >
                  <span>
                    {produk.nama} × {produk.qty}
                  </span>

                  <span>
                    Rp{" "}
                    {(
                      Number(produk.harga) *
                      Number(produk.qty)
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}

              <p className="text-right font-bold mt-3">
                Total: Rp{" "}
                {Number(pesanan.total || 0).toLocaleString(
                  "id-ID"
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Riwayat;