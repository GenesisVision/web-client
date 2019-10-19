import "./dashboard-portfolio-chart-section.scss";

import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  DashboardChartAssetsLoader,
  DashboardChartDescriptionLoader,
  DashboardChartLoader,
  DashboardChartRequestLoader
} from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loaders";
import DashboardInRequestsContainer from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-in-requests-container";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import useTab from "shared/hooks/tab.hook";
import { isNewUserSelector } from "shared/reducers/header-reducer";
import { AuthRootState } from "shared/utils/types";

import {
  dashboardAssetsFundsSelector,
  dashboardAssetsProgramsSelector
} from "../../reducers/dashboard-assets.reducer";
import { dashboardInRequestsSelector } from "../../reducers/dashboard-in-requests.reducer";
import {
  cancelRequest,
  getInRequests
} from "../../services/dashboard-in-requests.service";
import {
  getAssetChart,
  getAssets,
  TChartAsset
} from "../../services/dashboard.service";
import DashboardChartAssetsContainer from "./dashboard-chart-assets/dashboard-chart-assets-container";
import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import DashboardGetStarted from "./dashboard-get-started";

const _DashboardPortfolioChartSection: React.FC = () => {
  const [t] = useTranslation();
  const [chartAsset, setChartAsset] = useState<TChartAsset | undefined>(
    undefined
  );
  const dispatch = useDispatch();
  const { tab, setTab } = useTab<ASSETS_TYPES>(ASSETS_TYPES.Program);
  const isNewUser = useSelector(isNewUserSelector);
  const programs = useSelector(dashboardAssetsProgramsSelector);
  const funds = useSelector(dashboardAssetsFundsSelector);
  const inRequests = useSelector(dashboardInRequestsSelector);
  const assetChart = useSelector(
    (state: AuthRootState) => state.dashboard.assetChart
  );
  const period = useSelector((state: AuthRootState) => state.dashboard.period);

  useEffect(() => {
    dispatch(getAssets);
  }, []);
  useEffect(() => {
    switch (true) {
      case !!programs.length:
        setTab(null, ASSETS_TYPES.Program);
        break;
      case !!funds.length:
        setTab(null, ASSETS_TYPES.Fund);
        break;
    }
  }, [programs, funds]);

  useEffect(() => {
    if (tab === ASSETS_TYPES.Program) setChartAsset(programs[0]);
    else if (tab === ASSETS_TYPES.Fund) setChartAsset(funds[0]);
  }, [tab, programs, funds]);

  useEffect(() => {
    chartAsset &&
      dispatch(getAssetChart(chartAsset.id, chartAsset.title, tab, period));
  }, [chartAsset, period, tab]);

  useEffect(() => {
    dispatch(getInRequests(tab));
  }, [tab]);

  if (isNewUser) return <DashboardGetStarted />;
  return (
    <>
      <div className="dashboard-portfolio-chart-section__tabs">
        <GVTabs value={tab} onChange={setTab}>
          <GVTab
            value={ASSETS_TYPES.Program}
            label={t(`manager.dashboard-page.assets.programs`)}
            visible={!!programs.length}
          />
          <GVTab
            value={ASSETS_TYPES.Fund}
            label={t(`manager.dashboard-page.assets.funds`)}
            visible={!!funds.length}
          />
        </GVTabs>
      </div>
      {tab === ASSETS_TYPES.Program && (
        <>
          <div className="dashboard-portfolio-chart-section__actions">
            <DashboardChartAssetsContainer
              condition={!!programs.length}
              loader={<DashboardChartAssetsLoader />}
              assets={programs}
              type={ASSETS_TYPES.Program}
            />
            <DashboardInRequestsContainer
              condition={!!inRequests}
              loader={<DashboardChartRequestLoader />}
              inRequests={inRequests!}
              cancelRequest={cancelRequest}
            />
          </div>
          <DashboardPortfolioChartContainer
            condition={!!assetChart && !!period}
            loader={
              <>
                <DashboardChartDescriptionLoader />
                <DashboardChartLoader />
              </>
            }
            period={period}
            assetChart={assetChart!}
          />
        </>
      )}
      {tab === ASSETS_TYPES.Fund && (
        <>
          <div className="dashboard-portfolio-chart-section__actions">
            <DashboardChartAssetsContainer
              condition={!!funds.length}
              loader={<DashboardChartAssetsLoader />}
              assets={funds}
              type={ASSETS_TYPES.Fund}
            />
            <DashboardInRequestsContainer
              condition={!!inRequests}
              loader={<DashboardChartRequestLoader />}
              inRequests={inRequests!}
              cancelRequest={cancelRequest}
            />
          </div>
          <DashboardPortfolioChartContainer
            condition={!!assetChart && !!period}
            loader={
              <>
                <DashboardChartDescriptionLoader />
                <DashboardChartLoader />
              </>
            }
            period={period}
            assetChart={assetChart!}
          />
        </>
      )}
    </>
  );
};

const DashboardPortfolioChartSection = React.memo(
  _DashboardPortfolioChartSection
);
export default DashboardPortfolioChartSection;
