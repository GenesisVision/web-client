export const profitabilityTypes = {
  Profit: "Profit",
  Loss: "Loss"
};

export enum PROFITABILITY_TYPES {
  PROFIT = "Profit",
  LOSS = "Loss"
}

export const isUseProfitability = (event: { type: PROFITABILITY_TYPES }) =>
  Object.keys(profitabilityTypes).includes(event.type);
