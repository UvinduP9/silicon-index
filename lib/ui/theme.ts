export type Theme = "dark" | "light";

/** localStorage key for an explicit theme choice. No key means "follow the system". */
export const THEME_STORAGE_KEY = "theme";

export function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}

/** An explicit choice wins; otherwise the system setting decides; dark is the fallback. */
export function resolveTheme(
  stored: string | null | undefined,
  systemPrefersLight: boolean,
): Theme {
  if (isTheme(stored)) return stored;
  return systemPrefersLight ? "light" : "dark";
}

/**
 * Runs in <head> before first paint. It only sets data-theme when the person
 * has made a choice, so the CSS media query handles the system setting.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
