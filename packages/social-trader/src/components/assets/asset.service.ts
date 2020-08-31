import { Broker, ExchangeInfo } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";

const GM_BROKER_NAME = "Genesis Markets";
export const GM_DEMO_BROKER_NAME = "Genesis Markets Demo";

export const fetchExchanges = (): Promise<ExchangeInfo[]> =>
  api
    .exchanges()
    .getExchanges()
    .then(({ items }) => items);

export const fetchBrokers = (): Promise<Broker[]> =>
  api
    .brokers()
    .getBrokers()
    .then(data =>
      data.brokers.sort(
        (a, b) => +(b.name === GM_BROKER_NAME) - +(a.name === GM_BROKER_NAME)
      )
    );
