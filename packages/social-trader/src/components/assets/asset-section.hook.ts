import { WalletBaseData } from "gv-api-web";
import { useGetRate } from "hooks/get-rate.hook";
import { fetchWalletsByCurrencyAvailableAction } from "pages/wallet/actions/wallet.actions";
import { walletsAvailableSelector } from "pages/wallet/reducers/wallet.reducers";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { safeGetElemFromArray } from "utils/helpers";
import { CurrencyEnum } from "utils/types";

type TUseAssetSectionProps = {
  assetCurrency: CurrencyEnum;
};

export type AssetSectionWalletType = WalletBaseData;

type TUseAssetSectionOutput = {
  rate: number;
  handleWalletChange: (walletId: string) => void;
  wallet: AssetSectionWalletType;
  wallets: AssetSectionWalletType[];
};

const useAssetSection = ({
  assetCurrency
}: TUseAssetSectionProps): TUseAssetSectionOutput => {
  const dispatch = useDispatch();
  const wallets = useSelector(walletsAvailableSelector);
  const accountCurrency = useSelector(currencySelector);
  const [wallet, setWallet] = useState<AssetSectionWalletType>(
    wallets.find(({ currency }) => currency === assetCurrency) || wallets[0]
  );
  const { rate, getRate } = useGetRate();

  useEffect(() => {
    dispatch(fetchWalletsByCurrencyAvailableAction(accountCurrency));
  }, [assetCurrency]);

  useEffect(() => {
    setWallet(
      wallets.find(({ currency }) => currency === assetCurrency) || wallets[0]
    );
  }, [wallets, assetCurrency]);

  useEffect(() => {
    wallet && getRate({ from: wallet.currency, to: assetCurrency });
  }, [wallet, assetCurrency]);

  const handleWalletChange = useCallback(
    (walletId: string) =>
      setWallet(safeGetElemFromArray(wallets, ({ id }) => id === walletId)),
    [wallets]
  );
  return { rate, handleWalletChange, wallet, wallets };
};
export default useAssetSection;
