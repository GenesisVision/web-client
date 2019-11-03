import DashboardStatisticTable from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-table";
import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

import {
  TDashboardInvestingStatistic,
  TDashboardProgramsStatistic
} from "../../dashboard.types";

const _DashboardStatistic: React.FC<Props> = ({ renderValues, data }) => {
  const [t] = useTranslation();
  const {
    total: { day, week, month },
    events
  } = data;
  return (
    <div>
      <div className="dashboard-statistic__values">
        <StatisticItemList>{renderValues(data)}</StatisticItemList>
        <StatisticItemList>
          <DashboardPercentItem
            label={t("dashboard-page.total.day")}
            value={day.profit}
          />
          <DashboardPercentItem
            label={t("dashboard-page.total.week")}
            value={week.profit}
          />
          <DashboardPercentItem
            label={t("dashboard-page.total.month")}
            value={month.profit}
          />
        </StatisticItemList>
      </div>
      <DashboardStatisticTable data={events} />
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: TDashboardProgramsStatistic & TDashboardInvestingStatistic;
  renderValues: (
    statistic: TDashboardProgramsStatistic & TDashboardInvestingStatistic
  ) => JSX.Element;
}

const _DashboardPercentItem: React.FC<{
  value: number;
  label: string;
}> = ({ value, label }) => {
  return (
    <StatisticItem big accent label={label}>
      <Profitability value={value} prefix={PROFITABILITY_PREFIX.SIGN}>
        <NumberFormat
          value={Math.abs(value)}
          suffix={" %"}
          thousandSeparator={" "}
          displayType="text"
        />
      </Profitability>
    </StatisticItem>
  );
};
const DashboardPercentItem = React.memo(_DashboardPercentItem);

const DashboardStatistic = withBlurLoader(React.memo(_DashboardStatistic));
export default DashboardStatistic;
