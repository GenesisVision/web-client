import { WalletData } from "gv-api-web";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
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
  const wallets = useSelector(walletsSelector);
  const [wallet, setWallet] = useState<WalletData>(
    wallets.find(x => x.currency === assetCurrency)!
  );
  const [rate, setRate] = useState<number>(1);

  useEffect(
    () => {
      fetchRate(wallet.currency, assetCurrency).then(setRate);
    },
    [wallet]
  );

  const handleWalletChange = useCallback(
    (walletId: string) => setWallet(wallets.find(({ id }) => id === walletId)!),
    [wallets]
  );
  return { rate, handleWalletChange, wallet, wallets };
};
export default useCreateAssetSection;
