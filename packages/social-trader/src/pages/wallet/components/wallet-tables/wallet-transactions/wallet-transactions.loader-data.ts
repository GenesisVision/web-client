import faker from "faker";
import { TransactionAssetDetails } from "gv-api-web";
import { getRandomInteger, tableLoaderCreator } from "utils/helpers";

import { MultiWalletTransaction } from "../../../wallet.types";

const walletTransactionLoaderDataCreator = (): MultiWalletTransaction => ({
  detailsTitle: "",
  id: "",
  actions: { canResend: false, canCancel: false },
  details: [{ details: "", title: "", url: "", canCopy: false }],
  asset: {} as TransactionAssetDetails,
  date: new Date(),
  status: "Done",
  description: faker.lorem.words(5),
  amount: {
    title: "",
    first: {
      logo: "",
      amount: getRandomInteger(0, 100),
      currency: "GVT",
      color: ""
    },
    second: {
      logo: "",
      amount: getRandomInteger(0, 100),
      currency: "GVT",
      color: ""
    }
  }
});

export const walletTransactionsLoaderData: MultiWalletTransaction[] = tableLoaderCreator(
  walletTransactionLoaderDataCreator
);
