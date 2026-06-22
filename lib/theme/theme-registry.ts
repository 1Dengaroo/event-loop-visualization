export interface ThemeDefinition {
  /** Unique ID used as the data-theme attribute value */
  id: string;
  /** Human-readable display name */
  name: string;
  /** Whether this theme is dark (controls .dark class for Tailwind dark: variant) */
  isDark: boolean;
}

export const themes: ThemeDefinition[] = [
  {
    id: "light",
    name: "Light",
    isDark: false,
  },
  {
    id: "dark",
    name: "Dark",
    isDark: true,
  },
];

export const themeIds = themes.map((t) => t.id);

export const darkThemeIds = themes.filter((t) => t.isDark).map((t) => t.id);

export function getThemeDefinition(id: string): ThemeDefinition | undefined {
  return themes.find((t) => t.id === id);
}
