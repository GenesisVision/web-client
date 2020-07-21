import TextWithQuestion from "components/text-with-question/text-with-question";
import useIsOpen from "hooks/is-open.hook";
import { InvestmentLimitPopup } from "pages/dashboard/components/kyc-limit/investment-limit-popup/investment-limit-popup";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _InvestmentLimitLabel: React.FC = () => {
  const [t] = useTranslation();
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <>
      <TextWithQuestion label={t("Investment limit")} onClickHelp={setOpen} />
      <InvestmentLimitPopup open={isOpen} onClose={setClose} />
    </>
  );
};

export const InvestmentLimitLabel = React.memo(_InvestmentLimitLabel);
