import * as React from "react";
import { useTranslation } from "react-i18next";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ASSET, ROLE } from "shared/constants/constants";
import useRole from "shared/hooks/use-role.hook";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _DepositTop: React.FC<Props> = ({
  header,
  asset,
  title,
  currency,
  availableToInvestBase
}) => {
  const [t] = useTranslation();
  const role = useRole();
  return (
    <div className="dialog__top">
      <div className="dialog__header">
        <h2>{header || t("deposit-asset.title")}</h2>
        <p>{title}</p>
      </div>
      {asset === ASSET.PROGRAM &&
        role === ROLE.INVESTOR &&
        availableToInvestBase && (
          <div className="dialog-field">
            <StatisticItem
              label={t("deposit-asset.program.available-to-invest")}
              big
            >
              {`${formatCurrencyValue(
                availableToInvestBase!,
                currency!
              )} ${currency}`}
            </StatisticItem>
          </div>
        )}
    </div>
  );
};

export interface Props {
  currency?: CurrencyEnum;
  title: string;
  availableToInvestBase?: number;
  asset: ASSET;
  header?: string;
}

const DepositTop = React.memo(_DepositTop);
export default DepositTop;
