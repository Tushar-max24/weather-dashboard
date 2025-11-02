export const loadTheme = () => {
  try {
    return localStorage.getItem("theme") || "light";
  } catch {
    return "light";
  }
};

export const saveTheme = (t) => {
  try {
    localStorage.setItem("theme", t);
  } catch {}
};
