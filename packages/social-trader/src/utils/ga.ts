import { useEffect, useState } from "react";
import { fetchRate } from "services/rate-service";
import { convertToCurrency } from "utils/currency-converter";
import { CurrencyEnum } from "utils/types";

const STATISTIC_CURRENCY = "USD";

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
  return fetchRate(STATISTIC_CURRENCY, currency).then(rate => {
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
