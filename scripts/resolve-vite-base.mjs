#!/usr/bin/env node
/**
 * Печатает pathname для <base href="..."> (с ведущим / и завершающим /, кроме корня «/»).
 * Должен совпадать с путём сайта на GitLab Pages.
 *
 * Приоритет: PAGES_BASE → CI_PAGES_URL → CI_PROJECT_NAME → /
 */

function emit(s) {
  process.stdout.write(s);
}

const manual = process.env.PAGES_BASE?.trim();
if (manual) {
  const trimmed = manual.replace(/^\/+|\/+$/g, "");
  if (!trimmed) {
    emit("/");
    process.exit(0);
  }
  emit(`/${trimmed.split("/").filter(Boolean).join("/")}/`);
  process.exit(0);
}

const pagesUrl = process.env.CI_PAGES_URL?.trim();
if (pagesUrl) {
  try {
    const { pathname } = new URL(pagesUrl);
    const segments = pathname.replace(/\/$/, "").split("/").filter(Boolean);
    if (segments.length === 0) {
      emit("/");
    } else {
      emit(`/${segments.join("/")}/`);
    }
    process.exit(0);
  } catch {
    // fallback
  }
}

const name = process.env.CI_PROJECT_NAME?.trim();
if (name) {
  emit(`/${name}/`);
  process.exit(0);
}

emit("/");
