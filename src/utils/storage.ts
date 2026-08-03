/** localStorage 读写封装：所有持久化集中在此，键名统一管理 */

export const STORAGE_KEYS = {
  theme: "ai-nav-theme",
  favorites: "ai-nav-favs",
  submissions: "ai-nav-submissions",
} as const;

export type ThemeMode = "light" | "dark";

export interface Submission {
  name: string;
  url: string;
  desc: string;
  at: string;
}

export function loadTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.theme);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* 忽略隐私模式等异常，走系统偏好 */
  }
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function saveTheme(theme: ThemeMode): void {
  localStorage.setItem(STORAGE_KEYS.theme, theme);
}

export function loadFavorites(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || "[]"));
  } catch {
    return new Set();
  }
}

export function saveFavorites(favorites: Set<string>): void {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify([...favorites]));
}

export function loadSubmissions(): Submission[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.submissions) || "[]");
  } catch {
    return [];
  }
}

export function saveSubmissions(list: Submission[]): void {
  localStorage.setItem(STORAGE_KEYS.submissions, JSON.stringify(list));
}
