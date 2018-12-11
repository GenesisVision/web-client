import { PureComponent } from "react";
import React, { Fragment } from "react";
import { translate } from "react-i18next";
import connect from "react-redux/es/connect/connect";
import { bindActionCreators, compose } from "redux";

import DashboardRequest from "../dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-request";
import {
  cancelRequestDispatch,
  getAssetRequests
} from "./services/asset-status.service";

class AssetStatusRequests extends PureComponent {
  state = { requests: null };

  componentDidMount() {
    const { id, role, asset } = this.props;
    getAssetRequests(id, role, asset).then(requests => {
      this.setState({ requests });
    });
  }

  handleCancel = () => {
    const { onCancel, handleCloseDropdown } = this.props;
    handleCloseDropdown();
    if (onCancel) onCancel();
  };

  render() {
    const { service, role, asset } = this.props;
    const { requests } = this.state;
    if (!requests) return null;
    return (
      <Fragment>
        {requests.map(x => (
          <DashboardRequest
            key={x.id}
            request={x}
            cancelRequest={service.cancelRequestDispatch}
            asset={asset}
            role={role}
            onApplyCancelRequest={this.handleCancel}
          />
        ))}
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ cancelRequestDispatch }, dispatch)
  };
};

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(AssetStatusRequests);
