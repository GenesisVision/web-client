import faker from "faker";
import { getRandomInteger } from "utils/helpers";

type MultiWalletTransaction = any; // TODO declare type

const walletTransactionLoaderDataCreator = (): MultiWalletTransaction => ({
  id: "",
  currencyFrom: "GVT",
  currencyTo: "GVT",
  type: "Investment",
  date: new Date(),
  status: "Done",
  logoFrom: "",
  logoTo: "",
  description: faker.lorem.words(5),
  amount: getRandomInteger(0, 100),
  amountTo: getRandomInteger(0, 100)
});

export const walletTransactionsLoaderData: MultiWalletTransaction[] = new Array(
  10
)
  .fill("")
  .map(walletTransactionLoaderDataCreator);
