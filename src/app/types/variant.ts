export interface ItemVariant {
  id: string;
  optionValueIds: string[];
  price: number;
  stock?: number;
  sku?: string;
}
