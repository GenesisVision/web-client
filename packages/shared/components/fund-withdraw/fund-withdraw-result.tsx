import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { calculatePercentage } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";

interface IFundWithdrawResultProps {
  availableToWithdraw: number;
  percent: number;
  currency: string;
  exitFee: number;
}

const FundWithdrawResult: React.FC<
  WithTranslation & IFundWithdrawResultProps
> = ({ t, exitFee, availableToWithdraw, percent, currency }) => {
  const amountToWithdraw = calculatePercentage(availableToWithdraw, percent);
  const feeInCurrency = calculatePercentage(amountToWithdraw, exitFee);
  const withdrawResult = amountToWithdraw - feeInCurrency;
  return (
    <ul className="dialog-list">
      <li className="dialog-list__item">
        <span className="dialog-list__title">
          {t("withdraw-fund.exit-fee")}
        </span>
        <span className="dialog-list__value">
          {exitFee} %
          <NumberFormat
            value={formatCurrencyValue(
              calculatePercentage(amountToWithdraw, exitFee),
              currency
            )}
            prefix=" (&asymp; "
            suffix={` ${currency})`}
            displayType="text"
          />
        </span>
      </li>
      <li className="dialog-list__item">
        <span className="dialog-list__title">
          {t("withdraw-fund.withdraw-amount")}
        </span>
        <span className="dialog-list__value">
          <NumberFormat
            value={formatCurrencyValue(withdrawResult, currency)}
            prefix=" &asymp; "
            suffix={` ${currency}`}
            displayType="text"
          />
        </span>
      </li>
    </ul>
  );
};

export default translate()(FundWithdrawResult);
