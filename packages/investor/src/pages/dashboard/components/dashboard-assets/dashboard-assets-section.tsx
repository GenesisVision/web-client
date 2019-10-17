import "shared/components/dashboard/dashboard-assets/dashboard-assets.scss";

import {
  getDashboardFunds,
  getDashboardPrograms
} from "pages/dashboard/services/dashboard-assets.service";
import {
  getAssetsCounts,
  IDashboardAssetsCounts
} from "pages/dashboard/services/dashboard.service";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect, ResolveThunks } from "react-redux";
import { InvestorRootState } from "reducers";
import {
  Action,
  ActionCreatorsMapObject,
  bindActionCreators,
  compose,
  Dispatch
} from "redux";
import DashboardFunds from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds";
import dashboardFundsTableSelector from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds.selector";
import DashboardPrograms from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs";
import dashboardProgramsTableSelector from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.selector";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import { ROLE } from "shared/constants/constants";
import useTab from "shared/hooks/tab.hook";

import { clearDashboardAssetsTableAction } from "../../actions/dashboard.actions";
import { DASHBOARD_PROGRAMS_COLUMNS } from "./dashboard-assets.constants";
import DashboardCopytrading from "./dashboard-copytrading";
import { dashboardCopytradingTableSelector } from "./dashboard-copytrading.selectors";

const DashboardAssetsSection: React.FC<Props> = ({
  title,
  counts,
  service
}) => {
  const { tab, setTab } = useTab<TABS>(TABS.PROGRAMS);
  const [t] = useTranslation();
  useEffect(() => {
    service.getAssetsCounts();
    return service.clearDashboardAssetsTable;
  }, [service]);
  const { programsCount, fundsCount, tradesCount } = counts;
  const handleTabChange = useCallback(
    (e: any, eventTab: string) => {
      if (eventTab === tab) return;
      setTab(e, eventTab);
    },
    [setTab, tab]
  );
  return (
    <Surface className="dashboard-assets">
      <div className="dashboard-assets__head">
        <h3>{t("investor.dashboard-page.assets.title")}</h3>
        <div className="dashboard-assets__tabs">
          <GVTabs value={tab} onChange={handleTabChange}>
            <GVTab
              value={TABS.PROGRAMS}
              label={t("investor.dashboard-page.assets.programs")}
              count={programsCount}
            />
            <GVTab
              value={TABS.FUNDS}
              label={t("investor.dashboard-page.assets.funds")}
              count={fundsCount}
            />
            <GVTab
              value={TABS.COPYTRADING}
              label={t("investor.dashboard-page.assets.copytrading")}
              count={tradesCount}
            />
          </GVTabs>
        </div>
      </div>
      <div className="dashboard-assets__table">
        {tab === TABS.PROGRAMS && (
          <>
            {/*
            //@ts-ignore */}
            <DashboardPrograms
              columns={DASHBOARD_PROGRAMS_COLUMNS}
              getDashboardPrograms={getDashboardPrograms}
              title={title}
              role={ROLE.INVESTOR}
            />
          </>
        )}
        {tab === TABS.FUNDS && (
          <>
            {/*
            //@ts-ignore */}
            <DashboardFunds
              getDashboardFunds={getDashboardFunds}
              title={title}
              role={ROLE.INVESTOR}
            />
          </>
        )}
        {tab === TABS.COPYTRADING && <DashboardCopytrading title={title} />}
      </div>
    </Surface>
  );
};

const mapStateToProps = (state: InvestorRootState) => {
  const counts = {
    programsCount: dashboardProgramsTableSelector(state).itemsData.data.total,
    fundsCount: dashboardFundsTableSelector(state).itemsData.data.total,
    tradesCount: dashboardCopytradingTableSelector(state).itemsData.data.total
  };
  return { counts };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    {
      clearDashboardAssetsTable: clearDashboardAssetsTableAction,
      getAssetsCounts
    },
    dispatch
  )
});

enum TABS {
  PROGRAMS = "PROGRAMS",
  FUNDS = "FUNDS",
  COPYTRADING = "COPYTRADING"
}

interface OwnProps {
  title: string;
}

interface StateProps {
  counts: IDashboardAssetsCounts;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  clearDashboardAssetsTable: typeof clearDashboardAssetsTableAction;
  getAssetsCounts: typeof getAssetsCounts;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

export default compose<React.ComponentType<OwnProps>>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  React.memo
)(DashboardAssetsSection);
