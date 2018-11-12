import "./dashboard-assets.scss";

import Surface from "shared/components/surface/surface";
import { GVTab, GVTabs } from "gv-react-components";
import React, { Component } from "react";

import DashboardFunds from "./dashboard-funds/dashboard-funds";
import DashboardPrograms from "./dashboard-programs/dashboard-programs";

class DashboardAssets extends Component {
  state = {
    tab: "programs"
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    const { title } = this.props;
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
          {tab === "programs" && <DashboardPrograms title={title} />}
          {tab === "funds" && <DashboardFunds title={title} />}
        </div>
      </Surface>
    );
  }
}

export default DashboardAssets;
