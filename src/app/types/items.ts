export type ItemType = "FOOD" | "PRODUCT";

export interface ItemVariant {
  name: string;
  price: number;
  stock?: number;
  sku?: string;
}

export interface ItemOption {
  name: string;
  price: number;
}

export interface BaseItem {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  categoryId: string;
  type: ItemType;
  image?: string;
  isAvailable: boolean;
}

export interface FoodItem extends BaseItem {
  type: "FOOD";
  ingredients: string[];
  options?: ItemOption[];
  nutrition?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  variants?: never;
}

export interface ProductItem extends BaseItem {
  type: "PRODUCT";
  stock: number;
  sku: string;
  variants?: ItemVariant[];
  ingredients?: never;
  options?: never;
}

export type Item = FoodItem | ProductItem;
