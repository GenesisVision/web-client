import { DepositTopOwnProps } from "components/deposit/components/deposit-top";
import InvestmentUnauthPopup from "components/details/details-description-section/investment-unauth-popup/investment-unauth-popup";
import GVButton from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import React from "react";

const _InvestmentUnauthButton: React.FC<Props> = ({
  header,
  message,
  label,
  title,
  currency,
  asset
}) => {
  const [isOpenUnAuth, setIsOpenUnAuth, setIsCloseUnAuth] = useIsOpen();
  return (
    <>
      <GVButton size={"xlarge"} onClick={setIsOpenUnAuth}>
        {label}
      </GVButton>
      <InvestmentUnauthPopup
        header={header}
        message={message}
        asset={asset}
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
