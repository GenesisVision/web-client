import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { withBlurLoader } from "decorators/with-blur-loader";
import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import DashboardStatisticTable from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-table";
import React from "react";
import { useTranslation } from "react-i18next";
import { EVENTS_ROUTE } from "routes/dashboard.routes";
import { CurrencyEnum } from "utils/types";

import {
  TDashboardInvestingStatistic,
  TDashboardTradingStatistic
} from "../../dashboard.types";
import styles from "./dashboard-statistic.module.scss";

const _DashboardStatistic: React.FC<Props> = ({
  EmptyBlock,
  renderValues,
  data,
  currency
}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const { equity, events, profits, programsCount, fundsCount } = data;
  const hasNotInvesting =
    programsCount !== undefined && fundsCount !== undefined
      ? !(programsCount && fundsCount)
      : true;
  const hasNotTrading = equity !== undefined ? !equity : true;
  const hasNotAssets = hasNotInvesting && hasNotTrading;
  if (hasNotAssets) return <EmptyBlock />;
  return (
    <>
      <div>
        <div className={styles["dashboard-statistic__values"]}>
          {renderValues(data)}
          <DashboardStatisticPeriods
            withProfitability
            currency={currency}
            data={profits}
          />
        </div>
        <DashboardStatisticTable data={events.items} />
      </div>
      <div className={styles["dashboard-statistic__see-all"]}>
        <Link to={linkCreator(EVENTS_ROUTE)}>
          {t("dashboard-page:statistic.see-all")}
        </Link>
      </div>
    </>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  EmptyBlock: React.ComponentType;
  currency: CurrencyEnum;
  data: TDashboardTradingStatistic & TDashboardInvestingStatistic;
  renderValues: (
    statistic: TDashboardTradingStatistic & TDashboardInvestingStatistic
  ) => JSX.Element;
}

const DashboardStatistic = withBlurLoader(React.memo(_DashboardStatistic));
export default DashboardStatistic;
