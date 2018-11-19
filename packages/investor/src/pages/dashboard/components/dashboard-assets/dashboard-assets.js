import "./dashboard-assets.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators, compose } from "redux";
import DashboardFunds from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds";
import DashboardPrograms from "shared/components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs";
import { DASHBOARD_FUNDS_COLUMNS } from "shared/components/dashboard/dashboard.constants";
import Surface from "shared/components/surface/surface";

import { getDashboardFunds } from "../../services/dashboard-funds.service";
import { getDashboardPrograms } from "../../services/dashboard-programs.service";

class DashboardAssets extends Component {
  state = {
    tab: "programs"
  };
  componentDidMount() {
    const { service } = this.props;
    service.getDashboardFunds();
    service.getDashboardPrograms();
  }

  fetchFunds = filters => {
    return getDashboardFunds(filters).then(({ data }) => {
      return { items: data.funds, total: data.total };
    });
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
          {tab === "programs" && (
            <DashboardPrograms
              getDashboardPrograms={getDashboardPrograms}
              title={title}
            />
          )}
          {tab === "funds" && (
            <DashboardFunds
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
const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    { getDashboardFunds, getDashboardPrograms },
    dispatch
  )
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(DashboardAssets);
