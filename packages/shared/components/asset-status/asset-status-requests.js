import { PureComponent } from "react";
import React from "react";
import Scrollbars from "react-custom-scrollbars";
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
    onCancel();
    handleCloseDropdown();
  };

  render() {
    const { service, role, asset } = this.props;
    const { requests } = this.state;
    if (!requests) return null;
    return (
      <Scrollbars autoHeight>
        <div className="dashboard-request-popover">
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
        </div>
      </Scrollbars>
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
