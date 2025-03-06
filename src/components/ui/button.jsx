export function Button({ children, asChild, variant = "primary", ...props }) {
  const className =
    variant === "secondary"
      ? "bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
      : "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600";

  return asChild ? (
    <span className={className} {...props}>
      {children}
    </span>
  ) : (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
