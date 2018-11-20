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
    tab: "programs"
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    const {
      title,
      getDashboardPrograms,
      getDashboardFunds,
      createProgramButtonToolbar,
      createProgramButtonBody,
      createProgramText,
      createFundButtonToolbar,
      createFundButtonBody,
      createFundText
    } = this.props;
    return (
      <Surface className="dashboard-assets">
        <div className="dashboard-assets__head">
          <div className="dashboard-assets__title">Assets</div>
          <div className="dashboard-assets__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab value={"programs"} label="Programs" />
              <GVTab value={"funds"} label="Funds" />
            </GVTabs>
          </div>
        </div>
        <div>
          {tab === "programs" && (
            <DashboardPrograms
              getDashboardPrograms={getDashboardPrograms}
              createButtonToolbar={createProgramButtonToolbar}
              createButtonBody={createProgramButtonBody}
              createText={createProgramText}
              title={title}
            />
          )}
          {tab === "funds" && (
            <DashboardFunds
              createButtonToolbar={createFundButtonToolbar}
              createButtonBody={createFundButtonBody}
              createText={createFundText}
              DASHBOARD_FUNDS_COLUMNS={DASHBOARD_FUNDS_COLUMNS}
              getDashboardFunds={getDashboardFunds}
              title={title}
            />
          )}
        </div>
      </Surface>
    );
  }
}

export default translate()(DashboardAssets);
