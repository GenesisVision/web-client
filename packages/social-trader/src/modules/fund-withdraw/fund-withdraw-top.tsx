import InvestPopupTop from "modules/invest-popup/invest-popup-top";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";

interface IFundWithdrawTopProps {
  isPending: boolean;
  availableToWithdraw: number;
  currency: string;
  title: string;
}

const _FundWithdrawTop: React.FC<IFundWithdrawTopProps> = ({
  isPending,
  availableToWithdraw,
  title,
  currency
}) => {
  const [t] = useTranslation();
  return (
    <InvestPopupTop
      title={t("withdraw-fund.title")}
      subtitle={title}
      labelText={t("withdraw-fund.available-to-withdraw")}
      text={`${formatCurrencyValue(availableToWithdraw, currency)} ${currency}`}
      isPending={isPending}
    />
  );
};

export const FundWithdrawTop = React.memo(_FundWithdrawTop);
