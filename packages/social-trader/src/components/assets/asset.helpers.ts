import {
  Broker,
  BrokerAccountType,
  BrokersProgramInfo,
  ExchangeAccountType
} from "gv-api-web";
import { NextPageContext } from "next";
import { getRandomInteger, getRandomWord, getRandomWords } from "utils/helpers";
import { CurrencyEnum } from "utils/types";

import { BROKER_CARD_EXTRA_STATE } from "./asset.constants";

export const getCurrency = (
  accountType: BrokerAccountType | ExchangeAccountType
): CurrencyEnum => accountType.currencies[0] as CurrencyEnum; // TODO say to backend change type to CurrencyEnum[]

export const getLeverage = (
  accountType: BrokerAccountType | ExchangeAccountType
): number => ("leverages" in accountType ? accountType.leverages[0] : 0);

export const getBrokerId = (
  accountTypes: Array<BrokerAccountType | ExchangeAccountType>
): string => accountTypes[0].id;

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

export const getExchangeAccountTypes = (
  accountTypes: ExchangeAccountType[]
) => {
  return accountTypes.map(({ name }) => name).join(", ");
};

export const getBrokerAccountTypes = (accountTypes: BrokerAccountType[]) => {
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

export const getBrokerLoaderData = (): Broker => ({
  name: getRandomWord(),
  description: getRandomWords(11),
  logoUrl: "",
  terms: getRandomWord(),
  assets: getRandomWord(),
  fee: getRandomInteger(0, 100),
  leverageMin: getRandomInteger(0, 100),
  leverageMax: getRandomInteger(0, 100),
  accountTypes: [
    {
      typeTitle: "",
      isCountryNotUSRequired: false,
      isDepositRequired: false,
      isKycRequired: false,
      id: getRandomWord(),
      name: getRandomWord(),
      description: getRandomWords(11),
      type: "MetaTrader4",
      leverages: [10],
      currencies: ["GVT"],
      minimumDepositsAmount: {},
      isSignalsAvailable: false
    }
  ],
  isKycRequired: false,
  tags: [
    {
      name: "ANYANY",
      color: "#FFF"
    }
  ]
});

export const getBrokersProgramInfoLoaderData = (): BrokersProgramInfo => {
  const loaderBroker = getBrokerLoaderData();
  return {
    brokers: [loaderBroker],
    currentAccountTypeId: loaderBroker.accountTypes[0].id
  };
};

export const getBrokerLoaderDataFunc: () => any = getBrokerLoaderData;
export const BrokerSelectLoaderData: Broker[] = new Array(7)
  .fill("")
  .map(getBrokerLoaderDataFunc);

export const setLastModifiedHeader = (
  ctx: NextPageContext,
  lastModified: Date
): void => {
  const modifiedSince = ctx.req?.headers["if-modified-since"];

  ctx.res?.setHeader("Last-Modified", new Date(lastModified).toString());

  if (
    modifiedSince &&
    +new Date(lastModified) - +new Date(modifiedSince) === 0
  ) {
    ctx.res!.statusCode = 304;
  }
};
