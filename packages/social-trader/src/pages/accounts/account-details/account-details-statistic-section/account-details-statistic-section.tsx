import "components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import DetailsStatisticSection from "components/details/details-statistic-section/details-statistic-section";
import dynamic from "next/dist/next-server/lib/dynamic";
import { accountAbsoluteProfitChartSelector } from "pages/accounts/account-details/reducers/absolute-profit-chart.reducer";
import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { formatCurrencyValue } from "utils/formatter";

import { statisticDataLoaderData } from "../account-details.loader-data";
import { accountBalanceChartSelector } from "../reducers/balance-chart.reducer";
import { accountStatusSelector } from "../reducers/description.reducer";
import { accountProfitChartSelector } from "../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../reducers/statistic-currency.reducer";
import AccountDetailsStatisticsElements, {
  IAccountStatisticData
} from "./account-details-statistics/account-details-statistics-elements";
import {
  useAccountChartStateValues,
  useChartPeriod
} from "./account-details.chart.helpers";

const FollowBalanceChart = dynamic(() =>
  import(
    "pages/follows/follow-details/follow-details-statistic-section/follow-balance-chart-section/follow-balance-chart"
  )
);
const ProgramAbsoluteProfitChart = dynamic(() =>
  import(
    "pages/invest/programs/program-details/program-details-statistic-section/program-details-chart-section/program-absolute-profit-chart-section/program-absolute-profit-chart"
  )
);
const ProgramProfitChart = dynamic(() =>
  import(
    "pages/invest/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart"
  )
);

const _AccountDetailsStatisticSection: React.FC = () => {
  const status = useSelector(accountStatusSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);
  return (
    <DetailsStatisticSection
      absoluteProfitChartSelector={accountAbsoluteProfitChartSelector}
      balanceChartSelector={accountBalanceChartSelector}
      profitChartSelector={accountProfitChartSelector}
      statisticCurrencySelector={statisticCurrencySelector}
      useChartStateValues={useAccountChartStateValues}
      useChartPeriod={useChartPeriod}
      renderProfitValue={({ statistic }) => (
        <NumberFormat
          value={formatCurrencyValue(
            statistic.profitPercent,
            statisticCurrency
          )}
          thousandSeparator={" "}
          displayType="text"
          suffix={` %`}
        />
      )}
      renderBalanceChart={({ color, currency, balanceChart }) => (
        <FollowBalanceChart
          color={color}
          balanceChart={balanceChart}
          currency={currency}
        />
      )}
      renderProfitChart={({ profitChart, chartCurrencies }) => (
        <ProgramProfitChart charts={profitChart} colors={chartCurrencies} />
      )}
      renderAbsoluteProfitChart={({ color, currency, chart }) => (
        <ProgramAbsoluteProfitChart
          color={color}
          chart={chart}
          currency={currency}
        />
      )}
      renderDetailsStatisticsElements={({ period, statisticData }) => (
        <AccountDetailsStatisticsElements
          loaderData={statisticDataLoaderData}
          status={status}
          data={statisticData! as IAccountStatisticData}
          period={period}
        />
      )}
    />
  );
};

const AccountDetailsStatisticSection = React.memo(
  _AccountDetailsStatisticSection
);
export default AccountDetailsStatisticSection;
