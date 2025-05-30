export type ProductType = {
  id: number;
  productName: string;
  slug: string;
  description: string;
  active?: boolean;
  isFeatured: boolean;
  features: string;
  taste?: string;
  origin?: string;
  rating?: number;
  popularityScore?: number;
  createdAt?: string;
  price: number;
  quantity?: number;
  images: {
    id: number;
    url: string;
  }[];
  category: {
    slug: string;
    categoryName: string;
  };
};
