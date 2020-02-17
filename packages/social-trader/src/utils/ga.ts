import { fetchRate } from "services/rate-service";
import { convertToCurrency } from "utils/currency-converter";
import { CurrencyEnum } from "utils/types";

const STATISTIC_CURRENCY = "GVT";

declare global {
  const ga: Function;
}

export const sendMessageToGA = (...args: any) => {
  if (typeof ga === "undefined") return;
  ga(...args);
};

export const sendEventToGA = ({
  eventValue,
  eventCategory,
  eventAction,
  eventLabel
}: GAEventType) =>
  sendMessageToGA("send", {
    hitType: "event",
    eventValue,
    eventCategory,
    eventAction,
    eventLabel
  });

export const convertToStatisticCurrency = (
  value: number,
  currency: CurrencyEnum
) => {
  return fetchRate(currency, STATISTIC_CURRENCY).then(rate => {
    return convertToCurrency(value, rate);
  });
};

export type GAEventType = {
  eventValue?: number;
  eventCategory?: string;
  eventAction?: string;
  eventLabel?: string;
};
