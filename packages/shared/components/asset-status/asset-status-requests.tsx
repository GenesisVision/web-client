import { ProgramRequest } from "gv-api-web";
import React, { Fragment, PureComponent } from "react";
import { TranslationFunction, translate } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "react-redux";
import { bindActionCreators, compose } from "redux";

import { ActionType, IDispatchable } from "../../utils/types";
import DashboardRequest from "../dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-request";
import {
  CancelReqestType,
  cancelRequestDispatch,
  getAssetRequests
} from "./services/asset-status.service";

export interface IAssetStatusRequestsOwnProps {
  id: string;
  role: string;
  asset: string;
  onCancel(): void;
  handleCloseDropdown(): void;
  t: TranslationFunction;
}

export interface IAssetStatusRequestsDispatchProps {
  service: {
    cancelRequestDispatch(x: CancelReqestType): IDispatchable<void>;
  };
}

export interface IAssetStatusRequestsState {
  requests?: Array<ProgramRequest>;
}

class AssetStatusRequests extends PureComponent<
  IAssetStatusRequestsOwnProps & IAssetStatusRequestsDispatchProps,
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

const mapDispatchToProps = (
  dispatch: Dispatch<ActionType>
): IAssetStatusRequestsDispatchProps => {
  return {
    service: bindActionCreators({ cancelRequestDispatch }, dispatch)
  };
};

export default compose(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(AssetStatusRequests);
