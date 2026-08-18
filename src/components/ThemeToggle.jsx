import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { scheme, toggleTheme } = useTheme();
  const isDark = scheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`rounded-md p-2 text-mute transition-colors hover:text-ink ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3v1.5M12 19.5V21M4.5 12H3m18 0h-1.5M6.4 6.4 5.3 5.3m13.4 13.4-1.1-1.1m0-12.3 1.1-1.1M6.4 17.6l-1.1 1.1M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
          />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 14.3A8.5 8.5 0 0 1 9.7 3 7 7 0 1 0 21 14.3Z"
          />
        </svg>
      )}
    </button>
  );
}
