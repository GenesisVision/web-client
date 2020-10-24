import {
  CommonWalletType,
  WalletItemType
} from "components/wallet-select/wallet-select";
import { WalletBaseData, WalletData } from "gv-api-web";

export const transformWalletItemToCommon = ({
  id,
  title,
  logoUrl,
  currency,
  available
}: WalletItemType): CommonWalletType => ({
  id,
  title,
  logoUrl,
  currency,
  available
});

export const transformAccountWalletToCommon = ({
  id,
  title,
  logoUrl,
  currency,
  available,
  isWithdrawalEnabled
}: WalletData): CommonWalletType => ({
  id,
  title,
  logoUrl,
  currency,
  available,
  isWithdrawalEnabled
});

export const transformAvailableWalletToCommon = ({
  id,
  title,
  logoUrl,
  currency,
  available,
  rate
}: WalletBaseData): CommonWalletType => ({
  id,
  title,
  logoUrl,
  currency,
  available,
  rate
});

export const normalizeWalletList = <T extends { id: string }>(
  wallets: T[]
): Record<string, T> =>
  wallets.reduce((prev, curr) => ({ ...prev, [curr.id]: curr }), {});

export const mergeNormalizedList = (
  list1: Record<string, CommonWalletType>,
  list2: Record<string, CommonWalletType>
): Record<string, CommonWalletType> =>
  Object.keys(list1).reduce(
    (prev, curr) => ({ ...prev, [curr]: { ...list1[curr], ...list2[curr] } }),
    {}
  );
