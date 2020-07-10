import { fundInvest } from "components/deposit/services/fund-deposit.service";
import { programInvest } from "components/deposit/services/program-deposit.service";
import { ASSET } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useApiRequest from "hooks/api-request.hook";
import {
  fetchWallets,
  TWalletsAvailableData
} from "pages/wallet/services/wallet.services";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { convertToStatisticCurrency, sendEventToGA } from "utils/ga";
import { safeGetElemFromArray } from "utils/helpers";
import { postponeCallback } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";

import DepositForm from "./deposit-form";
import DepositTop from "./deposit-top";
import { MinDepositType, TFees } from "./deposit.types";

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
  const profileCurrency = useAccountCurrency();
  const dispatch = useDispatch();
  const onCloseMiddleware = postponeCallback(() => {
    onClose();
    onApply();
  });
  const updateWalletInfoMiddleware = () =>
    dispatch(fetchWallets(profileCurrency));
  const { sendRequest, errorMessage } = useApiRequest({
    successMessage: `deposit-asset.${asset.toLowerCase()}.success-alert-message`,
    request: getRequestMethod(asset),
    middleware: [onCloseMiddleware, updateWalletInfoMiddleware]
  });
  const handleInvest = useCallback(
    ({ amount, walletId }) => {
      return sendRequest({ id, amount, walletId }).then(res => {
        if (!res) return;
        const walletCurrency = safeGetElemFromArray(
          wallets,
          ({ id }) => id === walletId
        ).currency;
        convertToStatisticCurrency(amount, walletCurrency).then(eventValue => {
          sendEventToGA({
            eventValue,
            eventCategory: "Button",
            eventAction:
              asset === ASSET.PROGRAM ? "InvestInProgram" : "InvestInFund"
          });
        });
      });
    },
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

export interface IDepositContainerProps {
  title: string;
  availableToInvest?: number;
  fees: TFees;
  minDeposit: MinDepositType;
  id: string;
  onClose: (param?: any) => void;
  onApply: () => void;
  currency: CurrencyEnum;
  asset: ASSET;
  hasEntryFee?: boolean;
  ownAsset?: boolean;
}

interface Props extends IDepositContainerProps {
  data: TWalletsAvailableData;
}

const DepositPopup = withBlurLoader(React.memo(_DepositPopup));
export default DepositPopup;
