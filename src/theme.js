const STORAGE_KEY = "color-scheme";

function getMeta() {
  return document.querySelector('meta[name="color-scheme"]');
}

function getStoredScheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return null;
}

export function getSystemScheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getResolvedScheme() {
  return getStoredScheme() ?? getSystemScheme();
}

export function applyColorScheme(scheme) {
  const root = document.documentElement;
  const meta = getMeta();

  root.classList.remove("scheme-light", "scheme-dark");

  if (scheme === "light" || scheme === "dark") {
    root.classList.add(`scheme-${scheme}`);
    if (meta) meta.content = scheme;
    localStorage.setItem(STORAGE_KEY, scheme);
    return;
  }

  if (meta) meta.content = "light dark";
  localStorage.removeItem(STORAGE_KEY);
}

export function toggleColorScheme() {
  const stored = getStoredScheme();
  if (stored) {
    applyColorScheme(null);
    return getSystemScheme();
  }

  const next = getSystemScheme() === "dark" ? "light" : "dark";
  applyColorScheme(next);
  return next;
}

export function isSchemePinned() {
  return getStoredScheme() !== null;
}
