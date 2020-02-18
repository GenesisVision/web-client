import "./deposit.scss";

import { fundInvest } from "components/deposit/services/fund-deposit.service";
import { programInvest } from "components/deposit/services/program-deposit.service";
import { ASSET } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import useApiRequest from "hooks/api-request.hook";
import {
  fetchWallets,
  TWalletsAvailableData
} from "pages/wallet/services/wallet.services";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";
import { sendEventToGA } from "utils/ga";
import { CurrencyEnum, SetSubmittingType } from "utils/types";
import { getPostponedOnCallback } from "utils/hook-form.helpers";

import DepositForm from "./deposit-form";
import DepositTop from "./deposit-top";
import { TFees } from "./deposit.types";

const _DepositPopup: React.FC<Props> = ({
  title,
  availableToInvest,
  fees,
  minDeposit,
  id,
  onApply,
  onClose,
  currency,
  hasEntryFee = false,
  asset,
  data: wallets,
  ownAsset
}) => {
  useEffect(() => {
    sendEventToGA({
      eventCategory: "Button",
      eventAction:
        asset === ASSET.PROGRAM ? "ClickInvestInProgram" : "ClickInvestInFund"
    });
  }, []);
  const profileCurrency = useSelector(currencySelector);
  const dispatch = useDispatch();
  const onCloseMiddleware = getPostponedOnCallback(onClose);
  const updateWalletInfoMiddleware = () =>
    dispatch(fetchWallets(profileCurrency));
  const { sendRequest, errorMessage } = useApiRequest({
    successMessage: `deposit-asset.${asset.toLowerCase()}.success-alert-message`,
    request: getRequestMethod(asset),
    middleware: [onApply, onCloseMiddleware, updateWalletInfoMiddleware]
  });
  const handleInvest = useCallback(
    ({ amount, walletId }) => sendRequest({ id, amount, walletId }).then(() => {
      sendEventToGA({
        eventCategory: "Button",
        eventAction:
          asset === ASSET.PROGRAM ? "InvestInProgram" : "InvestInFund"
      });
    }),
    [id, asset, sendEventToGA]
  );

  return (
    <>
      <DepositTop
        ownAsset={ownAsset}
        title={title}
        availableToInvest={availableToInvest}
        asset={asset}
        currency={currency}
      />
      <DepositForm
        ownAsset={ownAsset}
        minDeposit={minDeposit}
        availableToInvest={ownAsset ? undefined : availableToInvest}
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
  onApply: () => void;
  currency: CurrencyEnum;
  asset: ASSET;
  data: TWalletsAvailableData;
  hasEntryFee?: boolean;
  ownAsset?: boolean;
}

const DepositPopup = withBlurLoader(React.memo(_DepositPopup));
export default DepositPopup;
