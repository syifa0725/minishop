import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const KeranjangContext = createContext();

export function KeranjangProvider({ children }) {
  const [item, setItem] = useLocalStorage("keranjang", []);

  function tambahKeKeranjang(produk) {
    setItem((dataLama) => {
      const sudahAda = dataLama.find(
        (i) => i.id === produk.id
      );

      if (sudahAda) {
        return dataLama.map((i) =>
          i.id === produk.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [
        ...dataLama,
        {
          ...produk,
          qty: 1,
        },
      ];
    });
  }

  function hapusDariKeranjang(id) {
    setItem((dataLama) =>
      dataLama.filter((i) => i.id !== id)
    );
  }

  function kurangiJumlah(id) {
    setItem((dataLama) => {
      return dataLama
        .map((i) =>
          i.id === id
            ? { ...i, qty: i.qty - 1 }
            : i
        )
        .filter((i) => i.qty > 0);
    });
  }

  const totalItem = item.reduce(
    (total, i) => total + (Number(i.qty) || 0),
    0
  );

  return (
    <KeranjangContext.Provider
      value={{
        item,
        tambahKeKeranjang,
        hapusDariKeranjang,
        kurangiJumlah,
        totalItem,
      }}
    >
      {children}
    </KeranjangContext.Provider>
  );
}

export function useKeranjang() {
  return useContext(KeranjangContext);
}