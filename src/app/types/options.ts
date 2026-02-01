export type OptionType = "BOOLEAN" | "SELECT" | "QUANTITY";

export interface ItemOption {
  id: string;
  name: string;
  type: OptionType;
  required: boolean;

  values?: OptionValue[];
  priceDelta?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface OptionValue {
  id: string;
  label: string;
  priceDelta?: number;
}
