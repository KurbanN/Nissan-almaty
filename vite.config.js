/* global process */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * В CI задаётся VITE_HTML_BASE (pathname вида / или /project/) — тогда Vite base = ./,
 * в index.html вставляется <base href>, и ./assets/* корректно резолвится на Pages.
 * Локально без env — обычный base /.
 */
const htmlBase = process.env.VITE_HTML_BASE?.trim();

export default defineConfig({
  base: htmlBase ? "./" : "/",
  plugins: [
    tailwindcss(),
    react(),
    {
      name: "inject-html-base-for-gitlab-pages",
      transformIndexHtml(html) {
        if (!htmlBase) return html;
        const href =
          htmlBase === "/" ? "/" : htmlBase.endsWith("/") ? htmlBase : `${htmlBase}/`;
        return html.replace(
          "<head>",
          `<head>\n    <base href="${href}" />`
        );
      },
    },
  ],
});
