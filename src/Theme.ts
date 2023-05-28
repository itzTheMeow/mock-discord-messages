export interface DiscordTheme {
  background: string;
  backgroundTertiary: string;
  link: string;
  text: string;
  textMuted: string;
}

export const DiscordDarkTheme: DiscordTheme = {
  background: "#313338",
  backgroundTertiary: "#2b2d31",
  link: "#00a8fc",
  text: "#dbdee1",
  textMuted: "#949ba4",
};
//TODO: add light theme

export function themeString(theme: DiscordTheme): string {
  return Object.entries(theme)
    .map(([k, v]) => `--${k}:${v};`)
    .join("");
}
