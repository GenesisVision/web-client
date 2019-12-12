import GVColors from "components/gv-styles/gv-colors";
import PieContainer from "components/pie-container/pie-container";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import {
  $pieAvailableColor,
  $piePendingColor
} from "components/wallet/components/wallet-balance/wallet-balance-elements";
import { withBlurLoader } from "decorators/with-blur-loader";
import WalletDeposit from "modules/wallet-deposit/wallet-deposit";
import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import React from "react";
import { useTranslation } from "react-i18next";
import { getPercentageValue } from "utils/helpers";
import { CurrencyEnum } from "utils/types";

import { TDashboardTotal } from "../../dashboard.types";

const DashboardTotalItem: React.FC<{
  color: string;
  label: string;
  value: number;
  currency: CurrencyEnum;
  total: number;
}> = React.memo(({ label, value, currency, color, total }) => {
  return (
    <>
      <PieContainer
        value={getPercentageValue(value, total)}
        label={`${getPercentageValue(value, total)} %`}
        color={color}
      />
      <DashboardValueItem label={label} value={value} currency={currency} />
    </>
  );
});

const _DashboardTotal: React.FC<Props> = ({
  currency,
  data: { wallets, invested, trading, profits, total }
}) => {
  const [t] = useTranslation();
  const hasMoney = total > 0;
  const hasProfits =
    Object.values(profits)
      .map(({ profit }) => profit)
      .reduce((prev, cur) => prev + cur, 0) !== 0;
  return (
    <div className="dashboard-total__values">
      <StatisticItemList className="dashboard-total__profits">
        <DashboardValueItem
          label={t("dashboard-page.total.total")}
          value={total}
          currency={currency}
        />
        <DashboardTotalItem
          currency={currency}
          color={GVColors.$primaryColor}
          label={t("dashboard-page.total.invested")}
          value={invested}
          total={total}
        />
        <DashboardTotalItem
          currency={currency}
          color={$piePendingColor}
          label={t("dashboard-page.total.pending")}
          value={trading}
          total={total}
        />
        <DashboardTotalItem
          currency={currency}
          color={$pieAvailableColor}
          label={t("dashboard-page.total.available")}
          value={wallets}
          total={total}
        />
        {!hasMoney && (
          <StatisticItem>
            <WalletDeposit />
          </StatisticItem>
        )}
      </StatisticItemList>
      {hasProfits && (
        <DashboardStatisticPeriods
          data={profits}
          currency={currency}
          withProfitability
        />
      )}
    </div>
  );
};

interface Props {
  currency: CurrencyEnum;
  data: TDashboardTotal;
}

const DashboardTotal = withBlurLoader(React.memo(_DashboardTotal));
export default DashboardTotal;
