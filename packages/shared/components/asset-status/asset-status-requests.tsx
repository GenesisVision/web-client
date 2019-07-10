import { ProgramRequest } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import DashboardRequest from "shared/components/dashboard/dashboard-portfolio-chart-section/dashboard-in-requests/dashboard-request";
import { CancelRequestPropsType } from "shared/components/dashboard/dashboard.constants";
import { ASSET } from "shared/constants/constants";
import withRole, { WithRoleProps } from "shared/decorators/with-role";
import { MiddlewareDispatch } from "shared/utils/types";

import {
  cancelRequestDispatch,
  getAssetRequests
} from "./services/asset-status.service";

class AssetStatusRequests extends React.PureComponent<Props, State> {
  state: State = {
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
    const { t, service, asset } = this.props;
    const { requests } = this.state;
    if (!requests) return null;
    if (requests.length === 0) {
      return (
        <div>{t("program-details-page.description.requests-completed")}</div>
      );
    }
    return (
      <>
        {requests.map(x => (
          <DashboardRequest
            key={x.id}
            request={x}
            cancelRequest={service.cancelRequestDispatch}
            asset={asset}
            onApplyCancelRequest={this.handleCancel}
          />
        ))}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: MiddlewareDispatch): DispatchProps => {
  return {
    service: {
      cancelRequestDispatch: (x: CancelRequestPropsType) =>
        dispatch(cancelRequestDispatch(x))
    }
  };
};

interface Props
  extends WithRoleProps,
    WithTranslation,
    DispatchProps,
    OwnProps {}

interface OwnProps {
  id: string;
  asset: ASSET;
  onCancel(): void;
  handleCloseDropdown(): void;
}

export interface DispatchProps {
  service: {
    cancelRequestDispatch(x: CancelRequestPropsType): Promise<any>;
  };
}

export interface State {
  requests?: Array<ProgramRequest>;
}

export default compose<React.ComponentType<OwnProps>>(
  withRole,
  connect(
    null,
    mapDispatchToProps
  ),
  translate()
)(AssetStatusRequests);
