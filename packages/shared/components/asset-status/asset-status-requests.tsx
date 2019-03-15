import { ProgramRequest } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import DashboardRequest from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-request";
import { ASSET, ROLE } from "shared/constants/constants";
import { MiddlewareDispatch } from "shared/utils/types";

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
    cancelRequestDispatch(x: CancelRequestType): Promise<any>;
  };
}

export interface IAssetStatusRequestsState {
  requests?: Array<ProgramRequest>;
}

class AssetStatusRequests extends React.Component<
  IAssetStatusRequestsOwnProps &
    InjectedTranslateProps &
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
  dispatch: MiddlewareDispatch<any>
): IAssetStatusRequestsDispatchProps => {
  return {
    service: {
      cancelRequestDispatch: (x: CancelRequestType) =>
        dispatch(cancelRequestDispatch(x))
    }
  };
};

export default compose<React.ComponentType<IAssetStatusRequestsOwnProps>>(
  connect(
    null,
    mapDispatchToProps
  ),
  translate()
)(AssetStatusRequests);
