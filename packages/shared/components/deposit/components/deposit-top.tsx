import * as React from "react";
import { useTranslation } from "react-i18next";
import { DialogTop } from "shared/components/dialog/dialog-top";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ASSET, ROLE } from "shared/constants/constants";
import useRole from "shared/hooks/use-role.hook";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _DepositTop: React.FC<DepositTopOwnProps> = ({
  header,
  asset,
  title,
  currency,
  availableToInvestBase
}) => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <DialogTop title={header || t("deposit-asset.title")} subtitle={title}>
      {asset === ASSET.PROGRAM &&
        role === ROLE.INVESTOR &&
        availableToInvestBase && (
          <StatisticItem
            label={t("deposit-asset.program.available-to-invest")}
            big
          >
            {`${formatCurrencyValue(
              availableToInvestBase!,
              currency!
            )} ${currency}`}
          </StatisticItem>
        )}
    </DialogTop>
  );
};

export interface DepositTopOwnProps {
  currency?: CurrencyEnum;
  title: string;
  availableToInvestBase?: number;
  asset: ASSET;
  header?: string;
}

const DepositTop = React.memo(_DepositTop);
export default DepositTop;
