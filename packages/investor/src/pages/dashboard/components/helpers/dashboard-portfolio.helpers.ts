export const profitabilityTypes = {
  Profit: "Profit",
  Loss: "Loss"
};

export enum PROFITABILITY_TYPES {
  Profit = "Profit",
  Loss = "Loss"
}

export const isUseProfitability = (type: string): boolean =>
  Object.keys(PROFITABILITY_TYPES).includes(type);
