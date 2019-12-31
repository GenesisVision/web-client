import { BlurContainer } from "components/blur-container/blur-container";
import { DialogList } from "components/dialog/dialog-list";
import { DialogListItem } from "components/dialog/dialog-list-item";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { calculatePercentage } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";

interface IFundWithdrawResultProps {
  isPending?: boolean;
  availableToWithdraw: number;
  percent: number;
  currency: string;
  exitFee: number;
}

const _FundWithdrawResult: React.FC<IFundWithdrawResultProps> = ({
  isPending,
  exitFee,
  availableToWithdraw,
  percent,
  currency
}) => {
  const [t] = useTranslation();
  const amountToWithdraw = calculatePercentage(availableToWithdraw, percent);
  const feeInCurrency = calculatePercentage(amountToWithdraw, exitFee);
  const withdrawResult = amountToWithdraw - feeInCurrency;
  return (
    <DialogList>
      {exitFee > 0 && (
        <DialogListItem label={t("withdraw-fund.exit-fee")}>
          <BlurContainer blur={!!isPending}>
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
          </BlurContainer>
        </DialogListItem>
      )}
      <DialogListItem label={t("withdraw-fund.withdraw-amount")}>
        <BlurContainer blur={!!isPending}>
          <NumberFormat
            value={formatCurrencyValue(withdrawResult, currency)}
            prefix=" &asymp; "
            suffix={` ${currency}`}
            displayType="text"
          />
        </BlurContainer>
      </DialogListItem>
    </DialogList>
  );
};

export const FundWithdrawResult = React.memo(_FundWithdrawResult);
