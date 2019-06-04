import "shared/components/dashboard/dashboard-assets/dashboard-assets.scss";

import {
  getDashboardFunds,
  getDashboardPrograms
} from "pages/dashboard/services/dashboard-assets.service";
import React, { Component, ComponentType } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { Action, Dispatch, bindActionCreators, compose } from "redux";
import DashboardFunds from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds";
import DashboardPrograms from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import Surface from "shared/components/surface/surface";
import { ROLE } from "shared/constants/constants";

import { clearDashboardAssetsTable } from "../../actions/dashboard.actions";
import {
  IDashboardAssetsCounts,
  fetchAssetsCount
} from "../../services/dashboard.service";
import { DASHBOARD_PROGRAMS_COLUMNS } from "./dashboard-assets.constants";
import DashboardCopytrading from "./dashboard-copytrading";

enum ASSET_TAB {
  PROGRAMS = "PROGRAMS",
  FUNDS = "FUNDS",
  COPYTRADING = "COPYTRADING"
}

interface IDashboardOwnProps {
  title: string;
}

interface IDashboardAssetsProps {
  service: {
    clearDashboardAssetsTable(): void;
  };
}

interface IDashboardAssetsState extends IDashboardAssetsCounts {
  tab: ASSET_TAB;
}

class DashboardAssetsSection extends React.PureComponent<
  IDashboardOwnProps & IDashboardAssetsProps & InjectedTranslateProps,
  IDashboardAssetsState
> {
  state = {
    tab: ASSET_TAB.PROGRAMS,
    programsCount: undefined,
    fundsCount: undefined,
    tradesCount: undefined
  };

  componentDidMount() {
    fetchAssetsCount().then(data => {
      this.setState({ ...data });
    });
  }

  handleTabChange = (e: any, tab: string) => {
    if (tab === this.state.tab) return;

    this.props.service.clearDashboardAssetsTable();
    this.setState({ tab: tab as ASSET_TAB });
  };

  componentWillUnmount() {
    this.props.service.clearDashboardAssetsTable();
  }

  render() {
    const { tab, programsCount, fundsCount, tradesCount } = this.state;
    const { t, title } = this.props;
    return (
      <Surface className="dashboard-assets">
        <div className="dashboard-assets__head">
          <h3>{t("investor.dashboard-page.assets.title")}</h3>
          <div className="dashboard-assets__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab
                value={ASSET_TAB.PROGRAMS}
                label={t("investor.dashboard-page.assets.programs")}
                count={programsCount}
              />
              <GVTab
                value={ASSET_TAB.FUNDS}
                label={t("investor.dashboard-page.assets.funds")}
                count={fundsCount}
              />
              <GVTab
                value={ASSET_TAB.COPYTRADING}
                label={t("investor.dashboard-page.assets.copytrading")}
                count={tradesCount}
              />
            </GVTabs>
          </div>
        </div>
        <div className="dashboard-assets__table">
          {tab === ASSET_TAB.PROGRAMS && (
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
          {tab === ASSET_TAB.FUNDS && (
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
          {tab === ASSET_TAB.COPYTRADING && (
            <DashboardCopytrading title={title} />
          )}
        </div>
      </Surface>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  service: bindActionCreators({ clearDashboardAssetsTable }, dispatch)
});

export default compose<ComponentType<IDashboardOwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(DashboardAssetsSection);
