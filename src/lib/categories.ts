export const CATEGORIES = [
  {
    slug: "disenador-masculino",
    label: "Catalogo diseñador masculino",
  },
  {
    slug: "disenador-femenino",
    label: "Catalogo diseñador femenino",
  },
  {
    slug: "alternativo-masculino",
    label: "Catalogo alternativo masculino",
  },
  {
    slug: "arabe-masculino",
    label: "Catalogo arabe masculino",
  },
  {
    slug: "arabe-unisex",
    label: "Catalogo arabe unisex",
  },
  {
    slug: "arabe-femenino",
    label: "Catalogo arabe femenino",
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function isCategorySlug(value: string): value is CategorySlug {
  return CATEGORIES.some((category) => category.slug === value);
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
