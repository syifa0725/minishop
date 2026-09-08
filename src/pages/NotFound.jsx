import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center py-16">
      <h2 className="text-3xl font-bold">404 - Halaman Tidak Ditemukan</h2>
      <Link to="/" className="text-indigo-600 mt-4 inline-block">
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFound;