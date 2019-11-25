import faker from "faker";
import { TransactionAssetDetails } from "gv-api-web";
import { getRandomInteger, tableLoaderCreator } from "utils/helpers";

import { MultiWalletTransaction } from "../../../wallet.types";

const walletTransactionLoaderDataCreator = (): MultiWalletTransaction => ({
  id: "",
  actions: { canResend: false, canCancel: false },
  details: [{ details: "", title: "" }],
  asset: {} as TransactionAssetDetails,
  date: new Date(),
  status: "Done",
  description: faker.lorem.words(5),
  amount: {
    first: {
      amount: getRandomInteger(0, 100),
      currency: "GVT",
      title: "",
      color: ""
    },
    second: {
      amount: getRandomInteger(0, 100),
      currency: "GVT",
      title: "",
      color: ""
    }
  },
  wallet: {
    first: {
      title: "",
      currency: "GVT",
      logo: ""
    },
    second: {
      title: "",
      currency: "GVT",
      logo: ""
    }
  }
});

export const walletTransactionsLoaderData: MultiWalletTransaction[] = tableLoaderCreator(
  walletTransactionLoaderDataCreator
);
