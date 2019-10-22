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
import { connect, ResolveThunks, useDispatch, useSelector } from "react-redux";
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
import { ROLE } from "shared/constants/constants";
import useTab from "shared/hooks/tab.hook";

import { clearDashboardAssetsTableAction } from "../../actions/dashboard.actions";
import { DASHBOARD_PROGRAMS_COLUMNS } from "./dashboard-assets.constants";
import DashboardCopytrading from "./dashboard-copytrading";
import { dashboardCopytradingTableSelector } from "./dashboard-copytrading.selectors";

const _DashboardAssetsSection: React.FC<Props> = ({ title, service }) => {
  const dispatch = useDispatch();
  const programsCount = useSelector(dashboardProgramsTableSelector).itemsData
    .data.total;
  const fundsCount = useSelector(dashboardFundsTableSelector).itemsData.data
    .total;
  const tradesCount = useSelector(dashboardCopytradingTableSelector).itemsData
    .data.total;
  const { tab, setTab } = useTab<TABS>(TABS.PROGRAMS);
  const [t] = useTranslation();
  useEffect(() => {
    service.getAssetsCounts();
    return () => {
      dispatch(clearDashboardAssetsTableAction());
    };
  }, [service]);
  const handleTabChange = useCallback(
    (e: any, eventTab: string) => {
      if (eventTab === tab) return;
      setTab(e, eventTab);
    },
    [setTab, tab]
  );
  return (
    <>
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
    </>
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

interface ServiceThunks extends ActionCreatorsMapObject {
  getAssetsCounts: typeof getAssetsCounts;
}

interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface Props extends OwnProps, DispatchProps {}

const DashboardAssetsSection = compose<React.ComponentType<OwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(_DashboardAssetsSection);
export default DashboardAssetsSection;
