import InvestPopupTop from "modules/invest-popup/invest-popup-top";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _ProgramWithdrawTop: React.FC<OwnProps> = ({
  availableToWithdraw,
  title,
  programCurrency
}) => {
  const [t] = useTranslation();
  return (
    <InvestPopupTop
      title={t("withdraw-program.title")}
      subtitle={title}
      labelText={t("withdraw-program.available-to-withdraw")}
      text={`${formatCurrencyValue(
        availableToWithdraw,
        programCurrency
      )} ${programCurrency}`}
    />
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
