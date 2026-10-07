export type Category = {
  id: string;
  slug: string;
  label: string;
  description: string | null;
  created_at: string;
};

export type Subcategory = {
  id: string;
  category_id: string;
  slug: string;
  label: string;
  created_at: string;
};
