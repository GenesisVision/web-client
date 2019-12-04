export const TAG_FILTER_NAME = "tags";

export const TAG_FILTER_DEFAULT_VALUE = [];

export enum TAG_NAME_TYPE {
  FOREX = "Forex",
  SIGNAL = "Signal",
  CRYPTO = "Crypto",
  HIGH_RISK = "HighRisk"
}

export type TagFilterType = TAG_NAME_TYPE[];

export type ComposedRequestTagName = "tags";
export type ComposedRequestTagValue = TagFilterType;
