import * as React from "react";
import { useTranslation } from "react-i18next";
import { DialogTop } from "shared/components/dialog/dialog-top";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _ProgramWithdrawTop: React.FC<OwnProps> = ({
  rate,
  accountCurrency,
  availableToWithdraw,
  title,
  programCurrency
}) => {
  const [t] = useTranslation();
  return (
    <DialogTop title={t("withdraw-program.title")} subtitle={title}>
      <StatisticItem label={t("withdraw-program.available-to-withdraw")} big>
        {formatCurrencyValue(availableToWithdraw, programCurrency)}{" "}
        {programCurrency}
      </StatisticItem>
    </DialogTop>
  );
};

const ProgramWithdrawTop = React.memo(_ProgramWithdrawTop);
export default ProgramWithdrawTop;

interface OwnProps {
  rate: number;
  availableToWithdraw: number;
  programCurrency: CurrencyEnum;
  accountCurrency: CurrencyEnum;
  title: string;
}
