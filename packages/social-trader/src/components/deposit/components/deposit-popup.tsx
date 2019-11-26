import "./deposit.scss";

import { withBlurLoader } from "decorators/with-blur-loader";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum, ReduxDispatch, SetSubmittingType } from "utils/types";

import { TWalltetsBaseData } from "../../wallet/services/wallet.services";
import DepositForm from "./deposit-form";
import DepositTop from "./deposit-top";
import { TAssetDeposit, TAssetInvestCreatorArgs, TFees } from "./deposit.types";

const _DepositPopup: React.FC<Props> = ({
  availableToInvest,
  fees,
  minDeposit,
  id,
  assetInvest,
  onApply,
  onClose,
  currency,
  hasEntryFee = false,
  asset,
  data: wallets,
  ownAsset
}) => {
  const dispatch = useDispatch<ReduxDispatch>();
  const { sendRequest, errorMessage } = useApiRequest({
    request: (values: TAssetInvestCreatorArgs) => {
      dispatch(assetInvest(values));
    }
  });
  const handleInvest = useCallback(
    (
      amount: number,
      currency: CurrencyEnum,
      setSubmitting: SetSubmittingType,
      walletId: string
    ) =>
      sendRequest({ id, amount, currency, walletId }, setSubmitting)
        .then(onApply)
        .then(onClose),
    [id]
  );

  return (
    <>
      <DepositTop
        availableToInvest={availableToInvest}
        asset={asset}
        currency={currency}
      />
      <DepositForm
        ownAsset={ownAsset}
        minDeposit={minDeposit}
        availableToInvest={availableToInvest}
        fees={fees}
        wallets={wallets}
        hasEntryFee={hasEntryFee}
        asset={asset}
        errorMessage={errorMessage}
        currency={currency}
        onSubmit={handleInvest}
      />
    </>
  );
};

const DepositPopup = withBlurLoader(React.memo(_DepositPopup));
export default DepositPopup;

interface Props {
  availableToInvest?: number;
  fees: TFees;
  minDeposit: number;
  id: string;
  onClose: (param?: any) => void;
  assetInvest: TAssetDeposit;
  onApply: () => void;
  currency: CurrencyEnum;
  asset: ASSET;
  data: TWalltetsBaseData;
  hasEntryFee?: boolean;
  ownAsset?: boolean;
}
