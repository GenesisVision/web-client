import { TDashboardTotalField } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import StatisticItem from "shared/components/statistic-item/statistic-item";

const _DashboardStatisticPeriods: React.FC<Props> = ({
  withProfitability,
  data: { day, week, month }
}) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList>
      <DashboardStatisticPeriodsItem
        withProfitability={withProfitability}
        label={t("dashboard-page.total.day")}
        item={day}
      />
      <DashboardStatisticPeriodsItem
        withProfitability={withProfitability}
        label={t("dashboard-page.total.week")}
        item={week}
      />
      <DashboardStatisticPeriodsItem
        withProfitability={withProfitability}
        label={t("dashboard-page.total.month")}
        item={month}
      />
    </StatisticItemList>
  );
};

interface Props {
  withProfitability?: boolean;
  data: {
    day: TDashboardTotalField;
    week: TDashboardTotalField;
    month: TDashboardTotalField;
  };
}

const _DashboardStatisticPeriodsItem: React.FC<{
  withProfitability?: boolean;
  item: TDashboardTotalField;
  label: string;
}> = ({ item, label, withProfitability }) => {
  return (
    <StatisticItem big accent label={label}>
      <NumberFormat
        value={item.value}
        prefix={"$ "}
        thousandSeparator={" "}
        displayType="text"
      />{" "}
      {withProfitability && (
        <Profitability value={item.profit} prefix={PROFITABILITY_PREFIX.SIGN}>
          <NumberFormat
            value={Math.abs(item.profit)}
            suffix={" %"}
            thousandSeparator={" "}
            displayType="text"
          />
        </Profitability>
      )}
    </StatisticItem>
  );
};
const DashboardStatisticPeriodsItem = React.memo(
  _DashboardStatisticPeriodsItem
);

const DashboardStatisticPeriods = React.memo(_DashboardStatisticPeriods);
export default DashboardStatisticPeriods;
