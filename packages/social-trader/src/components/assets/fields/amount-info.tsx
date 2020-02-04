import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { CurrencyEnum } from "utils/types";

const _AmountInfo: React.FC<Props> = ({
  assetCurrency,
  minimumDepositsAmount,
  walletAvailable,
  walletCurrency
}) => {
  const [t] = useTranslation();
  return (
    <div>
      <div className="deposit-details__available-amount">
        {t("create-program-page.settings.fields.min-deposit")}
        <span className={"deposit-details__available-amount-value"}>
          <NumberFormat
            value={minimumDepositsAmount}
            thousandSeparator=" "
            displayType="text"
            suffix={` ${assetCurrency}`}
          />
        </span>
      </div>
      <div className="deposit-details__available-amount">
        {t("create-fund-page.settings.fields.available-in-wallet")}
        <span className={"deposit-details__available-amount-value"}>
          <NumberFormat
            value={walletAvailable}
            thousandSeparator=" "
            displayType="text"
            suffix={` ${walletCurrency}`}
          />
        </span>
      </div>
    </div>
  );
};

interface Props {
  assetCurrency: CurrencyEnum;
  minimumDepositsAmount: number;
  walletAvailable: number;
  walletCurrency: CurrencyEnum;
}

const AmountInfo = React.memo(_AmountInfo);
export default AmountInfo;
