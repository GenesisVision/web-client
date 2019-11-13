import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import React from "react";
import { useTranslation } from "react-i18next";
import GVColors from "shared/components/gv-styles/gv-colors";
import PieContainer from "shared/components/pie-container/pie-container";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import {
  $pieAvailableColor,
  $piePendingColor
} from "shared/components/wallet/components/wallet-balance/wallet-balance-elements";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import WalletDeposit from "shared/modules/wallet-deposit/wallet-deposit";
import { getPercentageValue } from "shared/utils/helpers";
import { CurrencyEnum } from "shared/utils/types";

import { TDashboardTotal } from "../../dashboard.types";

const _DashboardTotal: React.FC<Props> = ({
  currency,
  data: { available, invested, pending, profits, total }
}) => {
  const [t] = useTranslation();
  const hasMoney = total > 0;
  const hasProfits =
    Object.values(profits).reduce((prev, cur) => prev + cur, 0) > 0;
  return (
    <div className="dashboard-total__values">
      <StatisticItemList className="dashboard-total__profits">
        <DashboardValueItem
          label={t("dashboard-page.total.total")}
          value={total}
          currency={currency}
        />
        <PieContainer
          value={getPercentageValue(invested, total)}
          label={`${getPercentageValue(invested, total)} %`}
          color={GVColors.$primaryColor}
        />
        <DashboardValueItem
          label={t("dashboard-page.total.invested")}
          value={invested}
          currency={currency}
        />
        <PieContainer
          value={getPercentageValue(pending, total)}
          label={`${getPercentageValue(pending, total)} %`}
          color={$piePendingColor}
        />
        <DashboardValueItem
          label={t("dashboard-page.total.pending")}
          value={pending}
          currency={currency}
        />
        <PieContainer
          value={getPercentageValue(available, total)}
          label={`${getPercentageValue(available, total)} %`}
          color={$pieAvailableColor}
        />
        <DashboardValueItem
          label={t("dashboard-page.total.available")}
          value={available}
          currency={currency}
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
