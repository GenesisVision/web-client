import "./dashboard-assets.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import DashboardFunds from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds";
import DashboardPrograms from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs";
import { DASHBOARD_FUNDS_COLUMNS } from "shared/components/dashboard/dashboard.constants";
import Surface from "shared/components/surface/surface";

class DashboardAssets extends Component {
  state = {
    tab: "programs",
    programsCount: undefined,
    fundsCount: undefined
  };

  componentDidMount() {
    const { fetchAssetsCount } = this.props;
    fetchAssetsCount().then(data => {
      this.setState({ ...data });
    });
  }

  handleTabChange = (e, tab) => {
    if (this.props.clearAssets) {
      this.props.clearAssets();
    }
    this.setState({ tab });
  };

  render() {
    const { tab, programsCount, fundsCount } = this.state;
    const {
      role,
      onChangeStatus,
      title,
      getDashboardPrograms,
      getDashboardFunds,
      createProgramButtonToolbar,
      createFundButtonToolbar,
      createFund,
      createProgram
    } = this.props;
    return (
      <Surface className="dashboard-assets">
        <div className="dashboard-assets__head">
          <h3>Assets</h3>
          <div className="dashboard-assets__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab
                value={"programs"}
                label="Programs"
                count={programsCount}
              />
              <GVTab value={"funds"} label="Funds" count={fundsCount} />
            </GVTabs>
          </div>
        </div>
        <div className="dashboard-assets__table">
          {tab === "programs" && (
            <DashboardPrograms
              getDashboardPrograms={getDashboardPrograms}
              createButtonToolbar={createProgramButtonToolbar}
              createProgram={createProgram}
              title={title}
              role={role}
              onChangeStatus={onChangeStatus}
            />
          )}
          {tab === "funds" && (
            <DashboardFunds
              createButtonToolbar={createFundButtonToolbar}
              createFund={createFund}
              DASHBOARD_FUNDS_COLUMNS={DASHBOARD_FUNDS_COLUMNS}
              getDashboardFunds={getDashboardFunds}
              title={title}
              role={role}
              onChangeStatus={onChangeStatus}
            />
          )}
        </div>
      </Surface>
    );
  }
}

export default translate()(DashboardAssets);
