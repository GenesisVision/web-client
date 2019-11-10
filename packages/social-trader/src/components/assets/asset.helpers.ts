import { BrokerAccountType } from "gv-api-web";
import { CurrencyEnum } from "shared/utils/types";

import { BROKER_CARD_EXTRA_STATE } from "./asset.constants";

export const getCurrency = (accountType: BrokerAccountType): CurrencyEnum =>
  accountType.currencies[0] as CurrencyEnum; // TODO say to backend change type to CurrencyEnum[]

export const getLeverage = (accountType: BrokerAccountType): number =>
  accountType.leverages[0];

export const getBrokerId = (accountTypes: BrokerAccountType[]): string =>
  accountTypes[0].id;

export const getLeverageDescription = (
  leverageMin: number,
  leverageMax: number
): string => {
  let result;

  if (leverageMin === leverageMax) {
    result = "1:" + leverageMin;
  } else {
    result = `1:${leverageMin} - 1:${leverageMax}`;
  }

  return result;
};

export const getAccountTypes = (accountTypes: BrokerAccountType[]) => {
  if (!accountTypes[0].currencies) return null;
  return accountTypes[0].currencies.join(", ");
};

export const getBrokerState = (
  isForex: boolean,
  isForexAllowed: boolean,
  isKycConfirmed: boolean
): BROKER_CARD_EXTRA_STATE => {
  if (isForex && !isKycConfirmed) {
    return BROKER_CARD_EXTRA_STATE.KYC_REQUIRED;
  }
  if (isForex && !isForexAllowed) {
    return BROKER_CARD_EXTRA_STATE.FOREX_DISABLED;
  }
  return BROKER_CARD_EXTRA_STATE.NONE;
};
