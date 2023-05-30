export interface DiscordTheme {
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  interactiveMuted: string;
  link: string;
  mentionBackground: string;
  mentionForeground: string;
  text: string;
  textMuted: string;
}

export const DiscordDarkTheme: DiscordTheme = {
  background: "#313338",
  backgroundSecondary: "#2b2d31",
  backgroundTertiary: "#1e1f22",
  interactiveMuted: "#4e5058",
  link: "#00a8fc",
  mentionBackground: "#3c4270",
  mentionForeground: "#c9cdfb",
  text: "#dbdee1",
  textMuted: "#949ba4",
};
//TODO: add light theme

export function themeString(theme: DiscordTheme): string {
  return Object.entries(theme)
    .map(([k, v]) => `--${k}:${v};`)
    .join("");
}
