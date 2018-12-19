import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators, compose } from "redux";
import DashboardAssets from "shared/components/dashboard/dashboard-assets/dashboard-assets";
import { INVESTOR } from "shared/constants/constants";

import { clearDashboardAssetsTable } from "../../actions/dashboard.actions";
import { getDashboardFunds } from "../../services/dashboard-funds.service";
import { getDashboardPrograms } from "../../services/dashboard-programs.service";
import { fetchAssetsCount } from "../../services/dashboard.service";

class DashboardAssetsContainer extends Component {
  getAssets = () => {
    const { service } = this.props;
    service.getDashboardFunds();
    service.getDashboardPrograms();
  };

  onChangeStatus = () => this.getAssets();

  render() {
    const { title, service } = this.props;
    return (
      <DashboardAssets
        clearAssets={service.clearDashboardAssetsTable}
        getDashboardPrograms={getDashboardPrograms}
        getDashboardFunds={getDashboardFunds}
        fetchAssetsCount={fetchAssetsCount}
        title={title}
        role={INVESTOR}
        onChangeStatus={this.onChangeStatus}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    { getDashboardFunds, getDashboardPrograms, clearDashboardAssetsTable },
    dispatch
  )
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(DashboardAssetsContainer);
