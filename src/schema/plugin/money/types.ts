import currency from "currency.js";

export const moneyKeyType = {
  AS_CURRENCY: "AS_CURRENCY",
  AS_CENTS: "AS_CENTS",
} as const;

export type MoneyKeyOptions = never;
export type MoneyKey =
  | {
      options?: MoneyKeyOptions;
      type: (typeof moneyKeyType)["AS_CURRENCY"];
      value: typeof currency | null | undefined;
    }
  | {
      options?: MoneyKeyOptions;
      type: (typeof moneyKeyType)["AS_CENTS"];
      value: number | null | undefined;
    };
