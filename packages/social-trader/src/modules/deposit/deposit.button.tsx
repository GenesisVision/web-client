import InvestmentUnauthPopup from "components/details/details-description-section/investment-unauth-popup/investment-unauth-popup";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import FundDepositContainer from "modules/fund-deposit/fund-deposit";
import ProgramDeposit from "modules/program-deposit/program-deposit";
import React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { ASSET } from "shared/constants/constants";
import { useTranslation } from "shared/i18n";
import { CurrencyEnum } from "utils/types";

const _DepositButton: React.FC<Props> = ({
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
  let deposit;
  switch (type) {
    case ASSET.FUND:
      deposit = (
        <FundDepositContainer
          title={title}
          ownAsset={ownAsset}
          onApply={onApply}
          entryFee={entryFee}
          availableToInvest={availableToInvest}
          open={isOpenDepositPopup}
          id={id}
          onClose={setIsDepositClosePopup}
        />
      );
      break;
    default:
      deposit = (
        <ProgramDeposit
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
  }
  const label = ownAsset ? t("buttons.deposit") : t("buttons.invest");
  const openPopupMethod = isAuthenticated
    ? setIsOpenDepositPopup
    : setIsOpenUnAuthInvestPopup;
  return (
    <>
      <GVButton size={size} onClick={openPopupMethod}>
        {label}
      </GVButton>
      {deposit}
      <InvestmentUnauthPopup
        message={t("program-details-page.description.unauth-popup")}
        title={""}
        currency={currency}
        availableToInvest={availableToInvest}
        asset={ASSET.PROGRAM}
        open={isOpenUnAuthInvestPopup}
        onClose={setIsCloseUnAuthInvestPopup}
      />
    </>
  );
};

interface Props {
  title: string;
  size?: GV_BTN_SIZE;
  onApply?: VoidFunction;
  ownAsset?: boolean;
  entryFee?: number;
  availableToInvest?: number;
  broker?: string;
  type: ASSET;
  id: string;
  currency?: CurrencyEnum;
}

const DepositButton = React.memo(_DepositButton);
export default DepositButton;
