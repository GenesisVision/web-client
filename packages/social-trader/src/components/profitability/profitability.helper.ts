export enum PROFITABILITY_PREFIX {
  ARROW = "arrow",
  SIGN = "sign",
  NO_PREFIX = "noPrefix"
}

export enum PROFITABILITY_VARIANT {
  TEXT = "text",
  CHIPS = "chips"
}

export const signs: composeProfitabilityPrefixType = {
  negative: "-",
  positive: "+"
};
export const arrows: composeProfitabilityPrefixType = {
  negative: `${String.fromCharCode(8595)} `,
  positive: `${String.fromCharCode(8593)} `
};
export const noPrefix: composeProfitabilityPrefixType = {
  negative: "",
  positive: ""
};

export const composeProfitabilityPrefix = (
  prefix: PROFITABILITY_PREFIX
): composeProfitabilityPrefixType => {
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

type composeProfitabilityPrefixType = {
  negative: string;
  positive: string;
};
