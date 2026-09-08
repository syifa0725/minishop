import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Button from "../components/Button";

function FormRegister() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    konfirmasi: "",
  });

  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.email.includes("@")) {
      setError("Email tidak valid");
      return;
    }

    if (form.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }

    if (form.password !== form.konfirmasi) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    setError("");
    login(form.email);
    navigate("/");
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow mt-8">
      <h2 className="text-xl font-bold mb-4">
        Daftar Akun
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border rounded-lg px-3 py-2 w-full"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg px-3 py-2 w-full"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg px-3 py-2 w-full"
          type="password"
          placeholder="Konfirmasi Password"
          value={form.konfirmasi}
          onChange={(e) =>
            setForm({
              ...form,
              konfirmasi: e.target.value,
            })
          }
        />

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full">
          Daftar
        </Button>
      </form>

      <p className="text-sm text-gray-500 mt-3">
        Sudah punya akun?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default FormRegister;