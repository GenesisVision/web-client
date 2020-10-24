import { onSelectChange } from "components/select/select.test-helpers";
import {
  CommonWalletType,
  HookFormWalletSelect,
  IWalletSelectProps
} from "components/wallet-select/wallet-select";
import {
  mergeNormalizedList,
  normalizeWalletList,
  transformAccountWalletToCommon,
  transformAvailableWalletToCommon
} from "components/wallet-select/wallet-select.helpers";
import {
  walletsAvailableSelector,
  walletsSelector
} from "pages/wallet/reducers/wallet.reducers";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { safeGetElemFromArray } from "utils/helpers";

export interface IWalletSelectContainerProps extends IWalletSelectProps {
  label?: string;
  onChange: (wallet: CommonWalletType) => void;
  filterFunc?: (wallet: any) => boolean;
}

const _WalletSelectContainer: React.FC<IWalletSelectContainerProps> = props => {
  const { onChange, label, filterFunc = () => true } = props;
  const [t] = useTranslation();
  const accountWallets = useSelector(walletsSelector);
  const availableWallets = useSelector(walletsAvailableSelector);

  const items = useMemo(() => {
    const normalizeAccountWallets = normalizeWalletList<CommonWalletType>(
      accountWallets.map(transformAccountWalletToCommon)
    );
    const normalizeAvailableWallets = normalizeWalletList<CommonWalletType>(
      availableWallets.map(transformAvailableWalletToCommon)
    );
    const mergedLists = mergeNormalizedList(
      normalizeAccountWallets,
      normalizeAvailableWallets
    );
    return Object.values(mergedLists).filter(filterFunc);
  }, [accountWallets, availableWallets]);

  const handleChange = useCallback(
    onSelectChange((id: string) => {
      const wallet = safeGetElemFromArray(items, wallet => wallet.id === id);
      onChange(wallet);
    }),
    [items]
  );

  return (
    <HookFormWalletSelect
      {...props}
      label={label || t("follow-program.create-account.from")}
      items={items}
      onChange={handleChange}
    />
  );
};

export const WalletSelectContainer = React.memo(_WalletSelectContainer);
