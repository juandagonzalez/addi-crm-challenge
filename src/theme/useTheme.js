import { useMemo } from "react";

export function useTheme() {
  return useMemo(
    () => ({
      color: {
        bg: "#0B1020",
        page: "#f6f8fb",
        card: "#ffffff",
        border: "#e6eaf2",
        text: "#1a2233",
        textMuted: "#5b677a",
        primary: "#0C3CFF",
        primaryDark: "#0728b3",
        accent: "#00D1B2",
        successBg: "#e7faf5",
        successBorder: "#bcefe2",
        successText: "#0c5a49",
        dangerBg: "#ffeff2",
        dangerBorder: "#ffc8d1",
        dangerText: "#7d1a2a",
        neutralBg: "#eef2f8",
        neutralBorder: "#d7deea",
        neutralText: "#344054",
        consoleBg: "#0b1020",
        consoleText: "#d6e7ff",
      },
      radius: {
        sm: 6,
        md: 10,
        lg: 14,
        pill: 999,
      },
      shadow: {
        sm: "0 1px 2px rgba(16,24,40,0.05)",
        md: "0 4px 10px rgba(16,24,40,0.08)",
        lg: "0 8px 24px rgba(16,24,40,0.12)",
      },
      space: (n) => `${n * 4}px`,
      font: {
        body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, Arial, sans-serif',
        mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
        size: {
          xs: 12,
          sm: 13,
          base: 14,
          md: 15.5,
          lg: 18,
          xl: 22,
          xxl: 28,
        },
        weight: {
          reg: 450,
          semi: 600,
          bold: 750,
        },
      },
      bp: {
        tablet: 720,
        desktop: 1024,
        wide: 1280,
      },
    }),
    []
  );
}
