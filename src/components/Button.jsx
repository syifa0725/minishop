function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled = false,
}) {
  let warna =
    "bg-indigo-600 text-white hover:bg-indigo-700";

  if (variant === "secondary") {
    warna =
      "bg-gray-100 text-gray-800 hover:bg-gray-200";
  } else if (variant === "danger") {
    warna =
      "bg-red-500 text-white hover:bg-red-600";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium text-sm ${warna} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;