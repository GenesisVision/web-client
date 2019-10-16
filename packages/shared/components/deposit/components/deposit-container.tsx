import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import FormError from "shared/components/form/form-error/form-error";
import { fetchBaseWallets } from "shared/components/wallet/services/wallet.services";
import { ASSET } from "shared/constants/constants";
import useApiRequest from "shared/hooks/api-request.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { CurrencyEnum, ReduxDispatch } from "shared/utils/types";

import DepositPopup from "./deposit-popup";
import { DepositInfoLoaderData } from "./deposit.loader";
import {
  TAssetInvestCreator,
  TGetAssetInfoCreator,
  TInvestInfoWithWallets
} from "./deposit.types";

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
  const stateCurrency = useSelector(currencySelector);
  const getDepositInfo = useCallback(
    () =>
      Promise.all([
        fetchInfo(id, currency || stateCurrency),
        dispatch(fetchBaseWallets())
      ]).then(([investInfo, wallets]) => ({ investInfo, wallets })),
    [id, currency, stateCurrency]
  );
  const { data, sendRequest: getInvestInfo, errorMessage } = useApiRequest<
    TInvestInfoWithWallets
  >({
    request: getDepositInfo
  });
  useEffect(
    () => {
      id && open && getInvestInfo();
    },
    [open]
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DepositPopup
        loaderData={DepositInfoLoaderData}
        id={id}
        onClose={onClose}
        assetInvest={assetInvest}
        onApply={onApply}
        data={data!}
        asset={asset}
        hasEntryFee={hasEntryFee}
        currency={currency || stateCurrency}
      />
      <FormError error={errorMessage} />
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
