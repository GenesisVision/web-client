import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { DialogList } from "shared/components/dialog/dialog-list";
import { DialogListItem } from "shared/components/dialog/dialog-list-item";
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
    <DialogList>
      {exitFee > 0 && (
        <DialogListItem label={t("withdraw-fund.exit-fee")}>
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
        </DialogListItem>
      )}
      <DialogListItem label={t("withdraw-fund.withdraw-amount")}>
        <NumberFormat
          value={formatCurrencyValue(withdrawResult, currency)}
          prefix=" &asymp; "
          suffix={` ${currency}`}
          displayType="text"
        />
      </DialogListItem>
    </DialogList>
  );
};

export default translate()(FundWithdrawResult);
