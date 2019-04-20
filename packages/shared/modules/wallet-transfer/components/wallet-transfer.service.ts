import { CopyTradingAccountInfo, WalletData } from "gv-api-web";

export const getDestinationItems: getDestinationWalletsType<
  CopyTradingAccountInfo | WalletData
> = (wallets, sourceId) => wallets.filter(wallet => wallet.id !== sourceId);

export type getDestinationWalletsType<T> = (
  wallets: T[],
  sourceId: string
) => T[];

export const getSelectedItem: getSelectedWalletType<
  CopyTradingAccountInfo | WalletData
> = (wallets, currentItemId) =>
  wallets.find(wallet => wallet.id === currentItemId)!;

export type getSelectedWalletType<T> = (wallets: T[], sourceId: string) => T;
