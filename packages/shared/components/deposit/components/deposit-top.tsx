import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ASSET, ROLE } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _DepositTop: React.FC<Props> = ({
  role,
  t,
  asset,
  title,
  currency,
  availableToInvestBase
}) => (
  <div className="dialog__top">
    <div className="dialog__header">
      <h2>{t("deposit-asset.title")}</h2>
      <p>{title}</p>
    </div>
    {asset === ASSET.PROGRAM && role === ROLE.INVESTOR && (
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

const DepositTop = compose<React.ComponentType<DepositTopOwnProps>>(
  withRole,
  translate(),
  React.memo
)(_DepositTop);
export default DepositTop;

export interface DepositTopOwnProps {
  currency?: CurrencyEnum;
  title: string;
  availableToInvestBase?: number;
  asset: ASSET;
}
interface Props extends DepositTopOwnProps, WithTranslation, WithRoleProps {}
