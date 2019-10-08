import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { DialogList } from "shared/components/dialog/dialog-list";
import { DialogListItem } from "shared/components/dialog/dialog-list-item";
import withLoader from "shared/decorators/with-loader";
import { calculatePercentage, convertFromCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

import { TInvestInfo } from "../deposit.types";

const _InvestorFees: React.FC<Props> = ({
  amount,
  rate,
  hasEntryFee,
  info,
  currency,
  walletCurrency
}) => {
  const gvFee = calculatePercentage(amount, info.gvCommission);
  const entryFee = calculatePercentage(amount - gvFee, info.entryFee);
  const investAmount = amount - gvFee - entryFee * +hasEntryFee;
  const [t] = useTranslation();
  return (
    <DialogList>
      {hasEntryFee && (
        <DialogListItem label={t("deposit-asset.entry-fee")}>
          {info.entryFee} %
          <NumberFormat
            value={formatCurrencyValue(
              convertFromCurrency(entryFee, rate),
              currency
            )}
            prefix=" ("
            suffix={` ${currency})`}
            displayType="text"
          />
        </DialogListItem>
      )}
      <DialogListItem label={t("deposit-asset.gv-commission")}>
        {info.gvCommission} %
        <NumberFormat
          value={formatCurrencyValue(gvFee, walletCurrency)}
          prefix={" ("}
          suffix={` ${walletCurrency})`}
          displayType="text"
        />
      </DialogListItem>
      <DialogListItem label={t("deposit-asset.investment-amount")}>
        <NumberFormat
          value={formatCurrencyValue(
            convertFromCurrency(investAmount, rate),
            currency
          )}
          prefix="≈ "
          suffix={` ${currency}`}
          displayType="text"
        />
      </DialogListItem>
    </DialogList>
  );
};

interface Props {
  hasEntryFee: boolean;
  info: TInvestInfo;
  amount: number;
  rate: number;
  currency: CurrencyEnum;
  walletCurrency: CurrencyEnum;
}

export const InvestorFees = withLoader(React.memo(_InvestorFees));
