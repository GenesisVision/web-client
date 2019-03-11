import { ProgramRequest } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import DashboardRequest from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-request";
import { ASSET, ROLE } from "shared/constants/constants";
import { ActionType, IDispatchable } from "shared/utils/types";

import {
  CancelRequestType,
  cancelRequestDispatch,
  getAssetRequests
} from "./services/asset-status.service";

export interface IAssetStatusRequestsOwnProps {
  id: string;
  role: ROLE;
  asset: ASSET;
  onCancel(): void;
  handleCloseDropdown(): void;
}

export interface IAssetStatusRequestsDispatchProps {
  service: {
    cancelRequestDispatch(x: CancelRequestType): IDispatchable<void>;
  };
}

export interface IAssetStatusRequestsState {
  requests?: Array<ProgramRequest>;
}

class AssetStatusRequests extends React.Component<
  IAssetStatusRequestsOwnProps &
    WithTranslation &
    IAssetStatusRequestsDispatchProps,
  IAssetStatusRequestsState
> {
  state: IAssetStatusRequestsState = {
    requests: undefined
  };

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
    const { t, service, role, asset } = this.props;
    const { requests } = this.state;
    if (!requests) return null;
    if (requests.length === 0) {
      return (
        <div>{t("program-details-page.description.requests-completed")}</div>
      );
    }
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<ActionType>
): IAssetStatusRequestsDispatchProps => {
  return {
    service: bindActionCreators({ cancelRequestDispatch }, dispatch)
  };
};

export default compose<React.ComponentType<IAssetStatusRequestsOwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  withTranslation()
)(AssetStatusRequests);
