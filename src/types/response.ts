import { ProductType } from "./product";

export type ResponseType = {
  result: ProductType[] | null; // Cambiado de 'any' a 'ProductType[] | null'
  loading: boolean;
  error: string | null;
};
