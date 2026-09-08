import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function FormLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
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

    setError("");

    login(form.email);

    navigate("/");
  }

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow mt-8">
      <h2 className="text-xl font-bold mb-4">
        Login
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >
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

        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-full"
        >
          Login
        </button>
      </form>

      <p className="text-sm text-gray-500 mt-3">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="text-indigo-600 hover:underline"
        >
          Daftar
        </Link>
      </p>
    </div>
  );
}

export default FormLogin;