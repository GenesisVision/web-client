import "shared/components/dashboard/dashboard-assets/dashboard-assets.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { Action, Dispatch, bindActionCreators, compose } from "redux";
import DashboardFunds from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds";
import DashboardPrograms from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs";
import Surface from "shared/components/surface/surface";
import { INVESTOR } from "shared/constants/constants";

import { clearDashboardAssetsTable } from "../../actions/dashboard.actions";
import { getDashboardFunds } from "../../services/dashboard-funds.service";
import { getDashboardPrograms } from "../../services/dashboard-programs.service";
import { fetchAssetsCount } from "../../services/dashboard.service";

enum ASSET_TAB {
  PROGRAMS = "PROGRAMS",
  FUNDS = "FUNDS",
  COPYTRADING = "COPYTRADING"
}

interface IDashboardAssetsProps {
  title: string;
  service: {
    clearDashboardAssetsTable(): void;
  };
}

interface IDashboardAssetsState {
  tab: ASSET_TAB;
  programsCount?: number;
  fundsCount?: number;
}

class DashboardAssetsSection extends Component<
  IDashboardAssetsProps,
  IDashboardAssetsState
> {
  state = {
    tab: ASSET_TAB.PROGRAMS,
    programsCount: undefined,
    fundsCount: undefined
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
    const { tab, programsCount, fundsCount } = this.state;
    const { title } = this.props;
    return (
      <Surface className="dashboard-assets">
        <div className="dashboard-assets__head">
          <h3>Assets</h3>
          <div className="dashboard-assets__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab
                value={ASSET_TAB.PROGRAMS}
                label="Programs"
                count={programsCount}
              />
              <GVTab value={ASSET_TAB.FUNDS} label="Funds" count={fundsCount} />
            </GVTabs>
          </div>
        </div>
        <div className="dashboard-assets__table">
          {tab === ASSET_TAB.PROGRAMS && (
            <DashboardPrograms
              getDashboardPrograms={getDashboardPrograms}
              title={title}
              role={INVESTOR}
            />
          )}
          {tab === ASSET_TAB.FUNDS && (
            <DashboardFunds
              getDashboardFunds={getDashboardFunds}
              title={title}
              role={INVESTOR}
            />
          )}
        </div>
      </Surface>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  service: bindActionCreators({ clearDashboardAssetsTable }, dispatch)
});

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(DashboardAssetsSection);
