import { DashboardChartValue } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import { formartChartMinValue } from "shared/components/chart/chart-components/chart-components.helpers";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import DashboardInRequestsContainer from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-in-requests-container";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import { CurrencyEnum, HandlePeriodChangeType } from "shared/utils/types";

import {
  cancelRequest,
  getInRequests
} from "../../../services/dashboard-in-requests.service";
import DashboardPortfolioChart from "./dashboard-portfolio-chart";
import DashboardPortfolioChartStat from "./dashboard-portfolio-chart-stat";

const composeBalanceChartData = (balanceChart: any) =>
  balanceChart.map((x: any) => ({
    date: x.date.getTime(),
    balance: formartChartMinValue(x.value)
  }));

const composeAssetsChartData = (
  assetsChart: any // TODO declare assets type
) =>
  assetsChart.map((x: any) => {
    let assetsCount = 0;
    const newAsset: { [keys: string]: any } = {
      date: x.date.getTime(),
      value: formartChartMinValue(x.value)
    };
    x.topAssets.forEach((asset: any) => {
      newAsset[`asset${assetsCount++}`] = {
        value: formartChartMinValue(asset.value),
        asset
      };
    });
    if (x.otherAssetsValue) {
      newAsset[`asset${assetsCount}`] = {
        value: x.otherAssetsValue.value,
        asset: {
          title: "Others",
          value: formartChartMinValue(x.otherAssetsValue.value),
          changePercent: x.otherAssetsValue.changePercent,
          changeValue: x.otherAssetsValue.changeValue
        }
      };
    }

    return newAsset;
  });

const _DashboardPortfolioChartSection: React.FC<Props> = ({
  t,
  data,
  currency,
  period,
  handleChangePeriod
}) => (
  <>
    <h3 className="dashboard-portfolio-chart-section__heading">
      {t("investor.dashboard-page.chart-section.header")}
    </h3>
    <DashboardInRequestsContainer
      cancelRequest={cancelRequest}
      getInRequests={getInRequests}
    />
    <DashboardPortfolioChartStat
      currency={currency}
      value={data.value}
      valueCurrency={data.valueCurrency}
      changePercent={data.changePercent}
      changeValue={data.changeValue}
      changeValueCurrency={data.changeValueCurrency}
    />
    <ChartPeriod
      condition={!!data.balanceChart.length}
      period={period}
      onChange={handleChangePeriod}
    />
    <div className="dashboard-portfolio-chart-section__chart">
      <DashboardPortfolioChart assets={composeAssetsChartData(data.investedProgramsInfo)} balance={composeBalanceChartData(data.balanceChart)} />
    </div>
  </>
);

interface Props extends InjectedTranslateProps, OwnProps {
}

interface OwnProps {
  currency: CurrencyEnum;
  data: DashboardChartValue;
  period: ChartDefaultPeriod;
  handleChangePeriod: HandlePeriodChangeType;
}

const DashboardPortfolioChartSection = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  React.memo,
  withLoader,
  translate()
)(_DashboardPortfolioChartSection);
export default DashboardPortfolioChartSection;
