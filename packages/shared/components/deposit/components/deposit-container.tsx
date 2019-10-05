import { FundInvestInfo, ProgramInvestInfo, WalletBaseData } from "gv-api-web";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { fetchBaseWallets } from "shared/components/wallet/services/wallet.services";
import { ASSET } from "shared/constants/constants";
import useErrorMessage from "shared/hooks/error-message.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { CurrencyEnum, ReduxDispatch, SetSubmittingType } from "shared/utils/types";

import DepositPopup from "./deposit-popup";
import { TAssetInvestCreator, TGetAssetInfoCreator } from "./deposit.types";

const _DepositContainer: React.FC<Props> = ({
  assetInvest,
  asset,
  id,
  open,
  hasEntryFee,
  onClose,
  currency,
  fetchInfo,
  onApply
}) => {
  const dispatch = useDispatch<ReduxDispatch>();
  const {
    errorMessage,
    setErrorMessage,
    cleanErrorMessage
  } = useErrorMessage();
  const stateCurrency = useSelector(currencySelector);
  const [wallets, setWallets] = useState<WalletBaseData[] | undefined>(
    undefined
  );
  const [investInfo, setInvestInfo] = useState<
    ProgramInvestInfo | FundInvestInfo | undefined
  >(undefined);
  useEffect(
    () => {
      if (!id) return;
      dispatch(fetchBaseWallets())
        .then(setWallets)
        .catch(setErrorMessage);
      fetchInfo(id, currency || stateCurrency)
        .then(setInvestInfo)
        .catch(setErrorMessage);
    },
    [id, currency, stateCurrency]
  );
  const closePopup = useCallback(() => {
    cleanErrorMessage();
    onClose();
  }, []);
  const handleInvest = useCallback(
    (
      amount: number,
      currency: CurrencyEnum,
      setSubmitting: SetSubmittingType
    ) => {
      dispatch(assetInvest(id, amount, currency))
        .then(onApply)
        .then(closePopup)
        .catch(setErrorMessage)
        .finally(() => {
          setSubmitting(false);
        });
    },
    [id]
  );
  return (
    <Dialog open={open} onClose={closePopup}>
      <DepositPopup
        condition={!!wallets && !!investInfo}
        loader={<DialogLoader />}
        wallets={wallets!}
        investInfo={investInfo!}
        asset={asset}
        hasEntryFee={hasEntryFee}
        currency={currency || stateCurrency}
        invest={handleInvest}
        errorMessage={errorMessage}
      />
    </Dialog>
  );
};

interface Props extends IDialogProps {
  asset: ASSET;
  id: string;
  onApply: () => void;
  fetchInfo: ReturnType<TGetAssetInfoCreator>;
  assetInvest: ReturnType<TAssetInvestCreator>;
  hasEntryFee?: boolean;
  currency?: CurrencyEnum;
}

const DepositContainer = React.memo(_DepositContainer);
export default DepositContainer;
