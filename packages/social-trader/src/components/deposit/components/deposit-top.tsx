import { DialogField } from "components/dialog/dialog-field";
import { DialogTop } from "components/dialog/dialog-top";
import StatisticItem from "components/statistic-item/statistic-item";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ASSET } from "shared/constants/constants";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _DepositTop: React.FC<DepositTopOwnProps> = ({
  header,
  asset,
  title,
  currency,
  availableToInvest
}) => {
  const [t] = useTranslation();
  return (
    <DialogTop
      title={header || t("deposit-asset.title")}
      subtitle={title || asset}
    >
      {asset === ASSET.PROGRAM && availableToInvest && (
        <DialogField>
          <StatisticItem
            label={t("deposit-asset.program.available-to-invest")}
            big
          >
            {`${formatCurrencyValue(availableToInvest, currency!)} ${currency}`}
          </StatisticItem>
        </DialogField>
      )}
    </DialogTop>
  );
};

export interface DepositTopOwnProps {
  currency?: CurrencyEnum;
  title?: string;
  availableToInvest?: number;
  asset: ASSET;
  header?: string;
}

const DepositTop = React.memo(_DepositTop);
export default DepositTop;
