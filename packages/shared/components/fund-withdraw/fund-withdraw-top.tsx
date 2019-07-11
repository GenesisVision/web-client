import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

interface IFundWithdrawTopProps {
  availableToWithdraw: number;
  currency: string;
  title: string;
}

const FundWithdrawTop: React.FC<IFundWithdrawTopProps & WithTranslation> = ({
  t,
  availableToWithdraw,
  title,
  currency
}) => {
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

export default translate()(FundWithdrawTop);
