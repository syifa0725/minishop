function Badge({ children, color = "gray" }) {
  let warna = "bg-gray-200 text-gray-700";

  if (color === "red") {
    warna = "bg-red-100 text-red-700";
  } else if (color === "green") {
    warna = "bg-green-100 text-green-700";
  }

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${warna}`}>
      {children}
    </span>
  );
}

export default Badge;