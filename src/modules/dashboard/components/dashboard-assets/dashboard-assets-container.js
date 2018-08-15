import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getAssets } from "../../services/dashboard-service";
import DashboardAssets from "./dashboard-assets";

class DashboardAssetsContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getAssets();
  }

  render() {
    return <DashboardAssets />;
  }
}

const mapStateToProps = state => {
  const { isPending, data } = state.programsData.items;
  return { isPending, data };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ getAssets }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardAssetsContainer);
