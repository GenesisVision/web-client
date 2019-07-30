import "shared/components/dashboard/dashboard-assets/dashboard-assets.scss";

import {
  getDashboardFunds,
  getDashboardPrograms
} from "pages/dashboard/services/dashboard-assets.service";
import React, { useCallback, useEffect, useState } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { Action, Dispatch, bindActionCreators, compose } from "redux";
import DashboardFunds from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds";
import DashboardPrograms from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import { ROLE } from "shared/constants/constants";
import useTab from "shared/hooks/tab.hook";

import { clearDashboardAssetsTableAction } from "../../actions/dashboard.actions";
import {
  IDashboardAssetsCounts,
  fetchAssetsCount
} from "../../services/dashboard.service";
import { DASHBOARD_PROGRAMS_COLUMNS } from "./dashboard-assets.constants";
import DashboardCopytrading from "./dashboard-copytrading";

const DashboardAssetsSection: React.FC<Props> = ({ t, title, service }) => {
  const { tab, setTab } = useTab<TABS>(TABS.PROGRAMS);
  const [counts, setCounts] = useState<IDashboardAssetsCounts>({});
  useEffect(
    () => {
      fetchAssetsCount().then(setCounts);
      return service.clearDashboardAssetsTable;
    },
    [service.clearDashboardAssetsTable]
  );
  const { programsCount, fundsCount, tradesCount } = counts;
  const handleTabChange = useCallback(
    (e: any, eventTab: string) => {
      if (eventTab === tab) return;
      service.clearDashboardAssetsTable();
      setTab(e, eventTab);
    },
    [service, setTab, tab]
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

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => ({
  service: bindActionCreators(
    { clearDashboardAssetsTable: clearDashboardAssetsTableAction },
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

interface DispatchProps {
  service: {
    clearDashboardAssetsTable(): void;
  };
}

interface Props extends OwnProps, DispatchProps, WithTranslation {}

export default compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  ),
  React.memo
)(DashboardAssetsSection);
