export type Perfume = {
  id: string;
  name: string;
  subtitle: string | null;
  category: string;
  subcategory_id: string | null;
  price: number | null;
  occasion: string | null;
  notes: string[];
  image_url: string;
  created_at: string;
};
