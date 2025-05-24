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
  price: number;
  images: {
    id: number;
    url: string;
  }[];
  category: {
    data: {
      attributes: {
        slug: string;
        categoryName: string;
      };
    };
  };
};
