import * as React from "react";
import { useTranslation } from "react-i18next";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

interface IFundWithdrawTopProps {
  availableToWithdraw: number;
  currency: string;
  title: string;
}

const _FundWithdrawTop: React.FC<IFundWithdrawTopProps> = ({
  availableToWithdraw,
  title,
  currency
}) => {
  const [t] = useTranslation();
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("withdraw-fund.title")}</h2>
        <p>{title}</p>
      </div>
      <div className="dialog-field">
        <StatisticItem label={t("withdraw-fund.available-to-withdraw")} big>
          {formatCurrencyValue(availableToWithdraw, currency)} {currency}
        </StatisticItem>
      </div>
    </div>
  );
};

export const FundWithdrawTop = React.memo(_FundWithdrawTop);
