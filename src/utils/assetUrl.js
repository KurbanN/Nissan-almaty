/**
 * Файлы из `public/` — с учётом Vite `base` (на GitLab Pages: `/project-slug/`).
 * Тогда `assetUrl('bioen/...')` → `/project-slug/bioen/...` (корректно и без trailing slash в URL).
 */
export function assetUrl(path) {
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL;
  if (base.endsWith("/")) {
    return `${base}${normalized}`;
  }
  return `${base}/${normalized}`;
}
