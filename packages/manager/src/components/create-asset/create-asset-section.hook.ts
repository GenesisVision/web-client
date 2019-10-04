import { WalletData } from "gv-api-web";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { fetchWallets } from "shared/components/wallet/services/wallet.services";
import { fetchRate } from "shared/services/rate-service";
import { CurrencyEnum } from "shared/utils/types";

type TUseCreateAssetSectionProps = {
  assetCurrency: CurrencyEnum;
};

type TUseCreateAssetSectionOutput = {
  rate: number;
  handleWalletChange: (walletId: string) => void;
  wallet: WalletData;
  wallets: WalletData[];
};

const useCreateAssetSection = ({
  assetCurrency
}: TUseCreateAssetSectionProps): TUseCreateAssetSectionOutput => {
  const dispatch = useDispatch();
  const wallets = useSelector(walletsSelector);
  const [wallet, setWallet] = useState<WalletData>(
    wallets.find(({ currency }) => currency === assetCurrency) || wallets[0]
  );
  const [rate, setRate] = useState<number>(1);

  useEffect(
    () => {
      dispatch(fetchWallets(assetCurrency));
    },
    [assetCurrency]
  );

  useEffect(
    () => {
      setWallet(
        wallets.find(({ currency }) => currency === assetCurrency) || wallets[0]
      );
    },
    [wallets]
  );

  useEffect(
    () => {
      wallet && fetchRate(wallet.currency, assetCurrency).then(setRate);
    },
    [wallet, assetCurrency]
  );

  const handleWalletChange = useCallback(
    (walletId: string) => setWallet(wallets.find(({ id }) => id === walletId)!),
    [wallets]
  );
  return { rate, handleWalletChange, wallet, wallets };
};
export default useCreateAssetSection;
