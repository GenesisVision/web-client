import { CopyTradingAccountInfo, WalletData } from "gv-api-web";

export const getDestinationWallets: getDestinationWalletsType<
  CopyTradingAccountInfo | WalletData
> = (wallets, sourceId) => wallets.filter(wallet => wallet.id !== sourceId);

export type getDestinationWalletsType<T> = (
  wallets: T[],
  sourceId: string
) => T[];

export const getSelectedWallet: getSelectedWalletType<
  CopyTradingAccountInfo | WalletData
> = (wallets, currentWalletId) =>
  wallets.find(wallet => wallet.id === currentWalletId)!;

export type getSelectedWalletType<T> = (wallets: T[], sourceId: string) => T;
