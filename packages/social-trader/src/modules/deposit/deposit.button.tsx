import { Button } from "components/button/button";
import InvestmentUnauthPopup from "components/details/details-description-section/investment-unauth-popup/investment-unauth-popup";
import { ASSET } from "constants/constants";
import useIsOpen from "hooks/is-open.hook";
import { useTranslation } from "i18n";
import FundDepositContainer from "modules/fund-deposit/fund-deposit";
import ProgramDeposit from "modules/program-deposit/program-deposit";
import React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { CurrencyEnum, Sizeable } from "utils/types";

interface Props extends Sizeable {
  AssetDetailsExtraBlock: React.ComponentType<any>;
  renderFees?: React.ReactNode;
  assetLevel?: number;
  assetOwner: string;
  ownerUrl: string;
  assetLogo: string;
  brokerName?: string;
  brokerLogo?: string;
  isProcessingRealTime?: boolean;
  infoMessage?: string;
  disabled?: boolean;
  title: string;
  onApply?: VoidFunction;
  ownAsset?: boolean;
  entryFee?: number;
  availableToInvest?: number;
  broker?: string;
  type: ASSET;
  id: string;
  currency?: CurrencyEnum;
  totalAvailableInvestment?: number;
  assetColor: string;
  assetLevelProgress?: number;
}

const _DepositButton: React.FC<Props> = ({
  ownerUrl,
  totalAvailableInvestment,
  assetColor,
  assetLevelProgress,
  assetLevel,
  renderFees,
  assetLogo,
  AssetDetailsExtraBlock,
  assetOwner,
  brokerLogo,
  brokerName,
  isProcessingRealTime,
  infoMessage,
  disabled,
  title,
  size,
  onApply,
  ownAsset,
  entryFee,
  type,
  id,
  currency,
  broker,
  availableToInvest
}) => {
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [
    isOpenDepositPopup,
    setIsOpenDepositPopup,
    setIsDepositClosePopup
  ] = useIsOpen();
  const [
    isOpenUnAuthInvestPopup,
    setIsOpenUnAuthInvestPopup,
    setIsCloseUnAuthInvestPopup
  ] = useIsOpen();
  const deposit =
    type === ASSET.FUND ? (
      <FundDepositContainer
        ownerUrl={ownerUrl}
        fundColor={assetColor}
        fundOwner={assetOwner}
        fundLogo={assetLogo}
        AssetDetailsExtraBlock={AssetDetailsExtraBlock}
        renderFees={renderFees}
        infoMessage={infoMessage}
        title={title}
        ownAsset={ownAsset}
        onApply={onApply}
        entryFee={entryFee}
        availableToInvest={availableToInvest}
        open={isOpenDepositPopup}
        id={id}
        onClose={setIsDepositClosePopup}
      />
    ) : (
        <ProgramDeposit
          ownerUrl={ownerUrl}
          totalAvailableInvestment={totalAvailableInvestment}
          programColor={assetColor}
          programLevelProgress={assetLevelProgress}
          programLevel={assetLevel}
          programLogo={assetLogo}
          renderFees={renderFees}
          AssetDetailsExtraBlock={AssetDetailsExtraBlock}
          brokerName={brokerName}
          brokerLogo={brokerLogo}
          programOwner={assetOwner}
          isProcessingRealTime={isProcessingRealTime}
          title={title}
          onApply={onApply}
          ownAsset={ownAsset}
          entryFee={entryFee}
          availableToInvest={availableToInvest}
          broker={broker!}
          currency={currency!}
          open={isOpenDepositPopup}
          id={id}
          onClose={setIsDepositClosePopup}
        />
      );
  const label = ownAsset ? t("buttons.deposit") : t("buttons.invest");
  const openPopupMethod = isAuthenticated
    ? setIsOpenDepositPopup
    : setIsOpenUnAuthInvestPopup;
  return (
    <>
      <Button
        testId={label}
        className={label}
        disabled={disabled}
        size={size}
        onClick={openPopupMethod}
      >
        {label}
      </Button>
      {deposit}
      <InvestmentUnauthPopup
        message={t(`asset-details:unauth-popup.${type.toLowerCase()}`)}
        title={""}
        currency={currency}
        availableToInvest={availableToInvest}
        asset={type}
        open={isOpenUnAuthInvestPopup}
        onClose={setIsCloseUnAuthInvestPopup}
      />
    </>
  );
};

const DepositButton = React.memo(_DepositButton);
export default DepositButton;
