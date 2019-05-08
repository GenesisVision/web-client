export enum PROFITABILITY_PREFIX {
  ARROW = "arrow",
  SIGN = "sign",
  NO_PREFIX = "noPrefix"
}

export enum PROFITABILITY_VARIANT {
  TEXT = "text",
  CHIPS = "chips"
}

export const signs = {
  negative: "-",
  positive: "+"
};
export const arrows = {
  negative: `${String.fromCharCode(8595)} `,
  positive: `${String.fromCharCode(8593)} `
};
export const noPrefix = {
  negative: "",
  positive: ""
};

export const composeProfitabilityPrefix = (
  prefix: PROFITABILITY_PREFIX
): { negative: string; positive: string } => {
  switch (prefix) {
    case PROFITABILITY_PREFIX.ARROW:
      return arrows;
    case PROFITABILITY_PREFIX.SIGN:
      return signs;
    case PROFITABILITY_PREFIX.NO_PREFIX:
    default:
      return noPrefix;
  }
};
