import { DialogList } from "components/dialog/dialog-list";
import { DialogListItem } from "components/dialog/dialog-list-item";
import { ASSET } from "constants/constants";
import Crashable from "decorators/crashable";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import {
  calculatePercentage,
  convertFromCurrency
} from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

import { TFees } from "../deposit.types";

interface Props {
  asset: ASSET;
  fees: TFees;
  hasEntryFee: boolean;
  amount: number;
  rate: number;
  currency: CurrencyEnum;
  walletCurrency: CurrencyEnum;
}

const _InvestorFees: React.FC<Props> = ({
  asset,
  fees: { gvCommission, entryFee = 0 },
  amount,
  rate,
  hasEntryFee,
  currency,
  walletCurrency
}) => {
  const isProgram = asset === ASSET.PROGRAM;
  const gvCommissionValue = calculatePercentage(amount, gvCommission);
  const entryFeeValue = calculatePercentage(
    amount - gvCommissionValue,
    isProgram ? 0 : entryFee
  );
  const investAmount =
    amount - gvCommissionValue - entryFeeValue * +hasEntryFee;
  const [t] = useTranslation();
  return (
    <DialogList>
      {hasEntryFee && (
        <DialogListItem
          label={
            isProgram
              ? t("deposit-asset.management-fee")
              : t("deposit-asset.entry-fee")
          }
        >
          {entryFee} %
          {isProgram ? (
            " (annual)"
          ) : (
            <NumberFormat
              value={formatCurrencyValue(
                convertFromCurrency(entryFeeValue, rate),
                currency
              )}
              prefix=" ("
              suffix={` ${currency})`}
              displayType="text"
            />
          )}
        </DialogListItem>
      )}
      <DialogListItem label={t("deposit-asset.gv-commission")}>
        {gvCommission} %
        <NumberFormat
          value={formatCurrencyValue(gvCommissionValue, walletCurrency)}
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

export const InvestorFees = React.memo(Crashable(_InvestorFees));
