export const ProfitabilityPrefix = {
  arrow: "arrow",
  sign: "sign",
  noPrefix: "noPrefix"
};

export const ProfitabilityVariant = {
  text: "text",
  chips: "chips"
};

export const composeProfitabilityPrefix = prefix => {
  switch (prefix) {
    case ProfitabilityPrefix.arrow:
      return {
        negative: `${String.fromCharCode(8595)} `,
        positive: `${String.fromCharCode(8593)} `
      };
    case ProfitabilityPrefix.sign:
      return {
        negative: "-",
        positive: "+"
      };
    case ProfitabilityPrefix.noPrefix:
    default:
      return {
        negative: "",
        positive: ""
      };
  }
};
