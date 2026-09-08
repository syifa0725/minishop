import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useKeranjang } from "../Context/KeranjangContext";

function Header() {
  const { user, logout } = useAuth();
  const { totalItem } = useKeranjang();

  return (
    <header>
      <h1>MiniShop</h1>

      <nav>
        <Link to="/">Beranda</Link>

        <Link to="/keranjang">
          Keranjang ({totalItem})
        </Link>

        {user ? (
          <>
            <span>Halo, {user.email}</span>

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;