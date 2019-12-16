import { getWalletBaseLoaderDataWithETHCurrency } from "components/wallet/components/wallet-loader";
import { WalletBaseData } from "gv-api-web";

export const DepositInfoLoaderData: WalletBaseData[] = [
  getWalletBaseLoaderDataWithETHCurrency()
];
