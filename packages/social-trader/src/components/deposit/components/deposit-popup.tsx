import { INIT_WALLET_CURRENCY } from "components/deposit/components/deposit.helpers";
import { fundInvest } from "components/deposit/services/fund-deposit.service";
import { programInvest } from "components/deposit/services/program-deposit.service";
import { ASSET } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import { useAccountCurrency } from "hooks/account-currency.hook";
import useApiRequest from "hooks/api-request.hook";
import InvestDefaultPopupContainer from "pages/invest/invest-default-popup-container";
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

import {
  MinDepositType,
  TAssetInvestCreatorArgs,
  TFees
} from "./deposit.types";
import DepositForm from "./deposit-form";

const getRequestMethod = (asset: ASSET) =>
  asset === ASSET.FUND ? fundInvest : programInvest;

export interface IDepositContainerProps {
  AssetDetailsExtraBlock?: React.ComponentType<any>;
  renderFees?: React.ReactNode;
  assetLevel?: number;
  ownerUrl: string;
  assetLogo: string;
  assetOwner: string;
  brokerName?: string;
  brokerLogo?: string;
  infoMessage?: string;
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
  totalAvailableInvestment?: number;
  assetColor: string;
  assetLevelProgress?: number;
}

interface Props extends IDepositContainerProps {
  data: TWalletsAvailableData;
}

const _DepositPopup: React.FC<Props> = ({
  ownerUrl,
  totalAvailableInvestment,
  assetLevelProgress,
  assetColor,
  assetLevel,
  assetLogo,
  AssetDetailsExtraBlock,
  renderFees,
  brokerLogo,
  brokerName,
  assetOwner,
  infoMessage,
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
      return sendRequest({
        id,
        amount,
        walletId
      } as TAssetInvestCreatorArgs).then(res => {
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

  const initWallet = safeGetElemFromArray(
    wallets,
    ({ currency }) => currency === INIT_WALLET_CURRENCY
  );
  return (
    <InvestDefaultPopupContainer
      ownerUrl={ownerUrl}
      totalAvailableInvestment={totalAvailableInvestment}
      assetColor={assetColor}
      assetLevelProgress={assetLevelProgress}
      assetLevel={assetLevel}
      assetLogo={assetLogo}
      AssetDetailsExtraBlock={AssetDetailsExtraBlock}
      renderFees={renderFees}
      assetOwner={assetOwner}
      brokerName={brokerName}
      brokerLogo={brokerLogo}
      ownAsset={ownAsset}
      title={title}
      availableToInvest={availableToInvest}
      asset={asset}
      currency={currency}
      form={
        <DepositForm
          infoMessage={infoMessage}
          ownAsset={ownAsset}
          minDeposit={minDeposit}
          availableToInvest={ownAsset ? undefined : availableToInvest}
          fees={fees}
          initWallet={initWallet}
          hasEntryFee={hasEntryFee}
          asset={asset}
          errorMessage={errorMessage}
          currency={currency}
          onSubmit={handleInvest}
        />
      }
    />
  );
};

const DepositPopup = withBlurLoader(React.memo(_DepositPopup));
export default DepositPopup;
