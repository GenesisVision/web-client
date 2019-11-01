import "./deposit.scss";

import { ProgramInvestInfoOld } from "gv-api-web";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import { ASSET } from "shared/constants/constants";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "shared/decorators/with-blur-loader";
import useApiRequest from "shared/hooks/api-request.hook";
import {
  CurrencyEnum,
  ReduxDispatch,
  SetSubmittingType
} from "shared/utils/types";

import DepositForm from "./deposit-form";
import DepositTop from "./deposit-top";
import { TAssetInvestCreator, TInvestInfoWithWallets } from "./deposit.types";

const _DepositPopup: React.FC<Props> = ({
  id,
  assetInvest,
  onApply,
  onClose,
  currency,
  hasEntryFee = false,
  asset,
  data
}) => {
  const dispatch = useDispatch<ReduxDispatch>();
  const { sendRequest, errorMessage } = useApiRequest({
    request: values =>
      dispatch(assetInvest(values))
        .then(onApply)
        .then(onClose)
  });
  const handleInvest = useCallback(
    (
      amount: number,
      currency: CurrencyEnum,
      setSubmitting: SetSubmittingType
    ) => sendRequest({ id, amount, currency }, setSubmitting),
    [id]
  );

  return (
    <>
      <DepositTop
        title={data.investInfo.title}
        availableToInvestBase={
          (data.investInfo as ProgramInvestInfoOld).availableToInvestBase
        }
        asset={asset}
        currency={currency}
      />
      <DepositForm
        wallets={data.wallets}
        hasEntryFee={hasEntryFee}
        asset={asset}
        errorMessage={errorMessage}
        currency={currency}
        info={data.investInfo}
        onSubmit={handleInvest}
      />
    </>
  );
};

const DepositPopup = compose<
  React.ComponentType<Props & WithBlurLoaderProps<TInvestInfoWithWallets>>
>(
  withBlurLoader,
  React.memo
)(_DepositPopup);
export default DepositPopup;

interface Props {
  id: string;
  onClose: (param?: any) => void;
  assetInvest: ReturnType<TAssetInvestCreator>;
  onApply: () => void;
  currency: CurrencyEnum;
  asset: ASSET;
  data: TInvestInfoWithWallets;
  hasEntryFee?: boolean;
}
