import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
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
    <ul className="dialog-list">
      {hasEntryFee && (
        <li className="dialog-list__item">
          <span className="dialog-list__title">
            {t("deposit-asset.entry-fee")}
          </span>
          <span className="dialog-list__value">
            {info.entryFee} %{" "}
            <NumberFormat
              value={formatCurrencyValue(
                convertFromCurrency(entryFee, rate),
                currency
              )}
              prefix=" ("
              suffix={` ${currency})`}
              displayType="text"
            />
          </span>
        </li>
      )}
      <li className="dialog-list__item">
        <span className="dialog-list__title">
          {t("deposit-asset.gv-commission")}
        </span>
        <span className="dialog-list__value">
          {info.gvCommission} %
          <NumberFormat
            value={formatCurrencyValue(gvFee, walletCurrency)}
            prefix={" ("}
            suffix={` ${walletCurrency})`}
            displayType="text"
          />
        </span>
      </li>
      <li className="dialog-list__item">
        <span className="dialog-list__title">
          {t("deposit-asset.investment-amount")}
        </span>
        <span className="dialog-list__value">
          <NumberFormat
            value={formatCurrencyValue(
              convertFromCurrency(investAmount, rate),
              currency
            )}
            prefix="≈ "
            suffix={` ${currency}`}
            displayType="text"
          />
        </span>
      </li>
    </ul>
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
