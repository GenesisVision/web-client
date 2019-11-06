import { TDashboardTotalField } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

const _DashboardStatisticPeriods: React.FC<Props> = ({
  currency,
  withProfitability,
  data: { day, week, month }
}) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList>
      <DashboardStatisticPeriodsItem
        currency={currency}
        withProfitability={withProfitability}
        label={t("dashboard-page.total.day")}
        item={day}
      />
      <DashboardStatisticPeriodsItem
        currency={currency}
        withProfitability={withProfitability}
        label={t("dashboard-page.total.week")}
        item={week}
      />
      <DashboardStatisticPeriodsItem
        currency={currency}
        withProfitability={withProfitability}
        label={t("dashboard-page.total.month")}
        item={month}
      />
    </StatisticItemList>
  );
};

interface Props {
  currency: CurrencyEnum;
  withProfitability?: boolean;
  data: {
    day: TDashboardTotalField;
    week: TDashboardTotalField;
    month: TDashboardTotalField;
  };
}

const _DashboardStatisticPeriodsItem: React.FC<{
  currency: CurrencyEnum;
  withProfitability?: boolean;
  item: TDashboardTotalField;
  label: string;
}> = ({ item, label, withProfitability, currency }) => {
  return (
    <StatisticItem big accent label={label}>
      <NumberFormat
        value={formatCurrencyValue(item.profit, currency)}
        suffix={` ${currency}`}
        thousandSeparator={" "}
        displayType="text"
      />{" "}
      {withProfitability && item.profitPercent !== 0 && (
        <Profitability
          value={item.profitPercent}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={Math.abs(item.profitPercent)}
            suffix={" %"}
            thousandSeparator={" "}
            displayType="text"
          />
        </Profitability>
      )}
    </StatisticItem>
  );
};
export const DashboardStatisticPeriodsItem = React.memo(
  _DashboardStatisticPeriodsItem
);

const DashboardStatisticPeriods = React.memo(_DashboardStatisticPeriods);
export default DashboardStatisticPeriods;
