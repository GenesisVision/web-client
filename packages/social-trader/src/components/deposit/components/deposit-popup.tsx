import "./deposit.scss";

import { fundInvest } from "components/deposit/services/fund-deposit.service";
import { programInvest } from "components/deposit/services/program-deposit.service";
import { withBlurLoader } from "decorators/with-blur-loader";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum, SetSubmittingType } from "utils/types";

import {
  fetchWallets,
  TWalltetsBaseData
} from "../../wallet/services/wallet.services";
import DepositForm from "./deposit-form";
import DepositTop from "./deposit-top";
import { TAssetDeposit, TFees } from "./deposit.types";

const _DepositPopup: React.FC<Props> = ({
  title,
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
  const dispatch = useDispatch();
  const updateWalletInfoMiddleware = () => dispatch(fetchWallets(currency));
  const { sendRequest, errorMessage } = useApiRequest({
    successMessage: `deposit-asset.${asset.toLowerCase()}.success-alert-message`,
    request: getRequestMethod(asset),
    middleware: [onApply, onClose, updateWalletInfoMiddleware]
  });
  const handleInvest = useCallback(
    (amount: number, setSubmitting: SetSubmittingType, walletId: string) =>
      sendRequest({ id, amount, walletId }, setSubmitting),
    [id]
  );

  return (
    <>
      <DepositTop
        title={title}
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

const getRequestMethod = (asset: ASSET) =>
  asset === ASSET.FUND ? fundInvest : programInvest;

interface Props {
  title: string;
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

const DepositPopup = withBlurLoader(React.memo(_DepositPopup));
export default DepositPopup;
