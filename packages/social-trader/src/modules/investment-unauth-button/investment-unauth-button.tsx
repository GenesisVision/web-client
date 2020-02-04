import { DepositTopOwnProps } from "components/deposit/components/deposit-top";
import InvestmentUnauthPopup from "components/details/details-description-section/investment-unauth-popup/investment-unauth-popup";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { ASSET } from "constants/constants";
import useIsOpen from "hooks/is-open.hook";
import React from "react";

const _InvestmentUnauthButton: React.FC<Props> = ({
  header,
  message,
  label,
  title,
  currency
}) => {
  const [isOpenUnAuth, setIsOpenUnAuth, setIsCloseUnAuth] = useIsOpen();
  return (
    <>
      <GVButton size={GV_BTN_SIZE.BIG} onClick={setIsOpenUnAuth}>
        {label}
      </GVButton>
      <InvestmentUnauthPopup
        header={header}
        message={message}
        asset={ASSET.PROGRAM}
        title={title}
        currency={currency}
        open={isOpenUnAuth}
        onClose={setIsCloseUnAuth}
      />
    </>
  );
};

interface Props extends DepositTopOwnProps {
  message: string;
  label: string;
}

export const InvestmentUnauthButton = React.memo(_InvestmentUnauthButton);
