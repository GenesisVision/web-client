import "./dashboard-portfolio-chart-section.scss";

import { ManagerAssets, ProgramRequests } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import {
  DashboardChartAssetsLoader,
  DashboardChartDescriptionLoader,
  DashboardChartLoader,
  DashboardChartRequestLoader
} from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loaders";
import DashboardInRequestsContainer from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-in-requests-container";
import Surface from "shared/components/surface/surface";
import { Nullable } from "shared/utils/types";

import { IDashboardAssetChart } from "../../reducers/dashboard.reducers";
import { cancelRequest } from "../../services/dashboard-in-requests.service";
import DashboardChartAssetsContainer from "./dashboard-chart-assets/dashboard-chart-assets-container";
import DashboardPortfolioChartContainer from "./dashboard-chart/dashboard-portfolio-chart-container";
import useTab from "shared/hooks/tab.hook";
import { useCallback } from "react";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";

const _DashboardPortfolioChartSection: React.FC<Props> = ({
  t,
  assets,
  assetChart,
  period,
  inRequests
}) => {
  const { tab, setTab } = useTab<TABS>(TABS.PROGRAMS);
  const handleTabChange = useCallback(
    (e: any, propTab: string) => {
      if (propTab === tab) return;
      setTab(e, propTab);
    },
    [tab]
  );
  return (
    <Surface className="dashboard-portfolio-chart-section">
      {/*<h3 className="dashboard-portfolio-chart-section__heading">*/}
      {/*{t("manager.dashboard-page.chart-section.header")}*/}
      {/*</h3>*/}
      <div className="dashboard-portfolio-chart-section__tabs">
        <GVTabs value={tab} onChange={handleTabChange}>
          <GVTab
            value={TABS.PROGRAMS}
            label={t(`manager.dashboard-page.assets.programs`)}
          />
          <GVTab
            value={TABS.FUNDS}
            label={t(`manager.dashboard-page.assets.funds`)}
          />
        </GVTabs>
      </div>
      {tab === TABS.PROGRAMS && (
        <>
          <div className="dashboard-portfolio-chart-section__actions">
            <DashboardChartAssetsContainer
              condition={!!assets}
              loader={<DashboardChartAssetsLoader />}
              assets={assets!}
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
      {tab === TABS.FUNDS && (
        <>
          <div className="dashboard-portfolio-chart-section__actions">
            <DashboardChartAssetsContainer
              condition={!!assets}
              loader={<DashboardChartAssetsLoader />}
              assets={assets!}
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
    </Surface>
  );
};

interface Props extends IDashboardPortfolioChartSectionProps, WithTranslation {}

export interface IDashboardPortfolioChartSectionProps {
  period: ChartDefaultPeriod;
  assetChart: Nullable<IDashboardAssetChart>;
  assets?: ManagerAssets;
  inRequests?: ProgramRequests;
}

enum TABS {
  PROGRAMS = "programs",
  FUNDS = "funds"
}

const DashboardPortfolioChartSection = translate()(
  _DashboardPortfolioChartSection
);
export default DashboardPortfolioChartSection;
