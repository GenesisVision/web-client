import { WalletBaseData } from "gv-api-web";
import { getWalletBaseLoaderDataWithETHCurrency } from "pages/wallet/components/wallet-loader";

export const DepositInfoLoaderData: WalletBaseData[] = [
  getWalletBaseLoaderDataWithETHCurrency()
];
