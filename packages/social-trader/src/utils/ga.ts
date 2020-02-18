import { useEffect, useState } from "react";
import { fetchRate } from "services/rate-service";
import { convertToCurrency } from "utils/currency-converter";
import { CurrencyEnum } from "utils/types";

const STATISTIC_CURRENCY = "GVT";

declare global {
  const ga: Function;
}

export const sendMessageToGA = (
  operation: string,
  fields: { [keys: string]: any }
) => {
  if (typeof window !== "undefined" || !("ga" in window)) return;
  // @ts-ignore
  window.ga(operation, fields);
};

export const sendEventToGA = ({
  eventValue,
  eventCategory,
  eventAction,
  eventLabel
}: GAEventType) =>
  sendMessageToGA("send", {
    hitCallback: () => {
      console.log(`send ${eventValue} ${eventCategory}`);
    },
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

export const useGA = (): { sendEvent: (event: GAEventType) => void } => {
  const [event, sendEvent] = useState<GAEventType | undefined>();
  useEffect(() => {
    if (event) sendEventToGA(event);
  }, [event, sendEventToGA]);
  return { sendEvent };
};
