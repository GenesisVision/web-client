import faker from "faker";
import { Broker, CancelablePromise } from "gv-api-web";
import brokersApi from "shared/services/api-client/brokers-api";

const GM_BROKER_NAME = "Genesis Markets";

export const fetchBrokers = (): CancelablePromise<Broker[]> =>
  brokersApi
    .getBrokers()
    .then(data =>
      data.brokers.sort(
        (a, b) => +(b.name === GM_BROKER_NAME) - +(a.name === GM_BROKER_NAME)
      )
    );

export const getBrokerLoaderData: () => Broker = () => ({
  name: faker.lorem.word(),
  description: faker.lorem.words(11),
  logo: "",
  terms: faker.lorem.word(),
  assets: faker.lorem.word(),
  fee: faker.random.number(),
  leverageMin: faker.random.number(),
  leverageMax: faker.random.number(),
  accountTypes: [
    {
      id: faker.lorem.word(),
      name: faker.lorem.word(),
      description: faker.lorem.words(11),
      type: "MetaTrader4",
      leverages: [10],
      currencies: ["GVT"],
      minimumDepositsAmount: {},
      isForex: false,
      isSignalsAvailable: false
    }
  ],
  isForex: false,
  isSignalsAvailable: false,
  tags: [
    {
      name: "ANYANY",
      color: "#FFF"
    }
  ]
});
export const CreateProgramBrokerLoaderData: Broker[] = new Array(7)
  .fill("")
  .map(getBrokerLoaderData);
