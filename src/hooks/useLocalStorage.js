import { useEffect, useState } from "react";

function useLocalStorage(key, nilaiAwal) {
  const [nilai, setNilai] = useState(() => {
    const tersimpan = localStorage.getItem(key);

    if (tersimpan) {
      try {
        return JSON.parse(tersimpan);
      } catch {
        return nilaiAwal;
      }
    }

    return nilaiAwal;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(nilai));
  }, [key, nilai]);

  return [nilai, setNilai];
}

export default useLocalStorage;