import { walletsSelector } from "components/wallet/reducers/wallet.reducers";
import { fetchWallets } from "components/wallet/services/wallet.services";
import { WalletData } from "gv-api-web";
import { useGetRate } from "hooks/get-rate.hook";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CurrencyEnum } from "utils/types";

type TUseAssetSectionProps = {
  assetCurrency: CurrencyEnum;
};

type TUseAssetSectionOutput = {
  rate: number;
  handleWalletChange: (walletId: string) => void;
  wallet: WalletData;
  wallets: WalletData[];
};

const useAssetSection = ({
  assetCurrency
}: TUseAssetSectionProps): TUseAssetSectionOutput => {
  const dispatch = useDispatch();
  const wallets = useSelector(walletsSelector);
  const [wallet, setWallet] = useState<WalletData>(
    wallets.find(({ currency }) => currency === assetCurrency) || wallets[0]
  );
  const { rate, getRate } = useGetRate();

  useEffect(() => {
    dispatch(fetchWallets(assetCurrency));
  }, [assetCurrency]);

  useEffect(() => {
    setWallet(
      wallets.find(({ currency }) => currency === assetCurrency) || wallets[0]
    );
  }, [wallets]);

  useEffect(() => {
    wallet && getRate({ from: wallet.currency, to: assetCurrency });
  }, [wallet, assetCurrency]);

  const handleWalletChange = useCallback(
    (walletId: string) => setWallet(wallets.find(({ id }) => id === walletId)!),
    [wallets]
  );
  return { rate, handleWalletChange, wallet, wallets };
};
export default useAssetSection;
