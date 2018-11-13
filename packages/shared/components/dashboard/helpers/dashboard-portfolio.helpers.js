export const profitabilityTypes = {
  Profit: "Profit",
  Loss: "Loss"
};

export const isUseProfitability = event =>
  Object.keys(profitabilityTypes).includes(event.type);
