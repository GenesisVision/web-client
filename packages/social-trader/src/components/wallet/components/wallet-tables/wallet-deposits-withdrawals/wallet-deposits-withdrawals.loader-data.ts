import { getRandomInteger } from "utils/helpers";

type MultiWalletExternalTransaction = any;

const walletDepositsWithdrawalsLoaderDataCreator = (): MultiWalletExternalTransaction => ({
  currency: "GVT",
  logo: "",
  isEnableActions: false,
  statusUrl: "",
  id: "",
  type: "Investment",
  date: new Date(),
  status: "Done",
  amount: getRandomInteger(0, 100)
});

export const walletDepositsWithdrawalsLoaderData: MultiWalletExternalTransaction[] = new Array(
  10
)
  .fill("")
  .map(walletDepositsWithdrawalsLoaderDataCreator);
