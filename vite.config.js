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
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const githubRepository = process.env.GITHUB_REPOSITORY?.trim(); // owner/repo

function resolveGithubBase() {
  if (!isGithubActions || !githubRepository) return "/";
  const [, repo] = githubRepository.split("/");
  if (!repo || repo.endsWith(".github.io")) return "/";
  return `/${repo}/`;
}

const resolvedBase = htmlBase ? "./" : resolveGithubBase();

export default defineConfig({
  base: resolvedBase,
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
