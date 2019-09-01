import * as React from "react";
import { useTranslation } from "react-i18next";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";

const _ProgramWithdrawTop: React.FC<OwnProps> = ({
  rate,
  accountCurrency,
  availableToWithdraw,
  title,
  programCurrency
}) => {
  const [t] = useTranslation();
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{t("withdraw-program.title")}</h2>
        <p>{title}</p>
      </div>
      <div className="dialog-field">
        <StatisticItem
          label={t("withdraw-program.available-to-withdraw")}
          big
          equivalent={
            +formatCurrencyValue(availableToWithdraw, accountCurrency)
          }
          equivalentCurrency={accountCurrency}
        >
          {formatCurrencyValue(
            convertToCurrency(availableToWithdraw, rate),
            programCurrency
          )}{" "}
          {programCurrency}
        </StatisticItem>
      </div>
    </div>
  );
};

const ProgramWithdrawTop = React.memo(_ProgramWithdrawTop);
export default ProgramWithdrawTop;

interface OwnProps {
  rate: number;
  availableToWithdraw: number;
  programCurrency: string;
  accountCurrency: string;
  title: string;
}
