import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

import { TDashboardTotal, TDashboardTotalField } from "../../dashboard.types";

const _DashboardTotal: React.FC<Props> = ({ data: { day, week, month } }) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList>
      <DashboardTotalItem label={t("dashboard-page.total.day")} item={day} />
      <DashboardTotalItem label={t("dashboard-page.total.week")} item={week} />
      <DashboardTotalItem
        label={t("dashboard-page.total.month")}
        item={month}
      />
    </StatisticItemList>
  );
};

interface Props {
  data: TDashboardTotal;
}

const _DashboardTotalItem: React.FC<{
  item: TDashboardTotalField;
  label: string;
}> = ({ item, label }) => {
  return (
    <div className="dashboard-total__values">
      <StatisticItem big accent label={label}>
        <NumberFormat
          value={item.value}
          prefix={"$ "}
          thousandSeparator={" "}
          displayType="text"
        />{" "}
        <Profitability value={item.profit} prefix={PROFITABILITY_PREFIX.SIGN}>
          <NumberFormat
            value={Math.abs(item.profit)}
            suffix={" %"}
            thousandSeparator={" "}
            displayType="text"
          />
        </Profitability>
      </StatisticItem>
    </div>
  );
};
const DashboardTotalItem = React.memo(_DashboardTotalItem);

const DashboardTotal = withBlurLoader(React.memo(_DashboardTotal));
export default DashboardTotal;
