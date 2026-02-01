import { Category } from "./category";

export type BusinessType =
  | "RESTAURANT"
  | "SUPERMARKET"
  | "VEGETABLES"
  | "TOBACCO"
  | "HYGIENE"
  | "CUSTOM";

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  type: BusinessType;
  categories: Category[];
}
