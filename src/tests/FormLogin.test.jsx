import React from "react";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../Context/AuthContext";
import FormLogin from "../pages/FormLogin";

function renderDenganProvider(ui) {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </BrowserRouter>
  );
}

describe("FormLogin", () => {
  it("menampilkan error jika email tidak valid", () => {
    renderDenganProvider(<FormLogin />);

    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");

    fireEvent.change(email, {
      target: {
        value: "email-salah",
      },
    });

    fireEvent.change(password, {
      target: {
        value: "123456",
      },
    });

    fireEvent.submit(
      email.closest("form")
    );

    expect(
      screen.getByText("Email tidak valid")
    ).toBeInTheDocument();
  });

  it("menampilkan error jika password kurang dari 6 karakter", () => {
    renderDenganProvider(<FormLogin />);

    const email = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");

    fireEvent.change(email, {
      target: {
        value: "test@gmail.com",
      },
    });

    fireEvent.change(password, {
      target: {
        value: "123",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(
      screen.getByText(
        "Password minimal 6 karakter"
      )
    ).toBeInTheDocument();
  });
});