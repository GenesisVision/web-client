import { MultiWalletExternalTransaction } from "gv-api-web";
import { getRandomInteger } from "shared/utils/helpers";

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
