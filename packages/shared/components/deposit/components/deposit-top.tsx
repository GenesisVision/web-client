import * as React from "react";
import { useTranslation } from "react-i18next";
import { DialogTop } from "shared/components/dialog/dialog-top";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ASSET } from "shared/constants/constants";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _DepositTop: React.FC<DepositTopOwnProps> = ({
  header,
  asset,
  currency,
  availableToInvest
}) => {
  const [t] = useTranslation();
  return (
    <DialogTop title={header || t("deposit-asset.title")} subtitle={asset}>
      {asset === ASSET.PROGRAM && availableToInvest && (
        <StatisticItem
          label={t("deposit-asset.program.available-to-invest")}
          big
        >
          {`${formatCurrencyValue(availableToInvest, currency)} ${currency}`}
        </StatisticItem>
      )}
    </DialogTop>
  );
};

export interface DepositTopOwnProps {
  currency: CurrencyEnum;
  availableToInvest?: number;
  asset: ASSET;
  header?: string;
}

const DepositTop = React.memo(_DepositTop);
export default DepositTop;
