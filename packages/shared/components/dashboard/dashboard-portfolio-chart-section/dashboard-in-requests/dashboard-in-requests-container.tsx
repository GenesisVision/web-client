import "./dashboard-in-requests.scss";

import { ProgramRequests } from "gv-api-web";
import { InvestorRootState } from "investor-web-portal/src/reducers";
import { ManagerRootState } from "manager-web-portal/src/reducers";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators, compose } from "redux";
import { CancelRequestType } from "shared/components/asset-status/services/asset-status.service";
import { DashboardChartRequestLoader } from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loaders";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import GVScroll from "shared/components/scroll/gvscroll";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ROLE_ENV } from "shared/constants/constants";
import { formatCurrencyValue } from "shared/utils/formatter";

import DashboardRequest from "./dashboard-request";

class DashboardInRequestsContainer extends React.PureComponent<Props, State> {
  state = {
    anchor: undefined
  };

  componentDidMount() {
    const { service } = this.props;
    service.getInRequests();
  }

  handleOpenDropdown = (event: React.MouseEvent<HTMLElement, MouseEvent>) =>
    this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: undefined });

  renderActionsIcon = () => {
    if (this.props.inRequests.requests.length === 0) return null;
    return (
      <ActionsCircleIcon
        className="dashboard-request__icon"
        primary={this.state.anchor !== null}
        onClick={this.handleOpenDropdown}
        dashboard__portfolio-events-aside
      />
    );
  };

  renderRequest = () => {
    const { t, inRequests, isPending, service } = this.props;
    if (!inRequests || isPending) return <DashboardChartRequestLoader />;
    return (
      <>
        <StatisticItem
          label={t(`${ROLE_ENV}.dashboard-page.chart-section.in-requests`)}
          big
        >
          <NumberFormat
            value={formatCurrencyValue(inRequests.totalValue, "GVT")}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
          {this.renderActionsIcon()}
        </StatisticItem>

        <Popover
          horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          anchorEl={this.state.anchor}
          noPadding
          onClose={this.handleCloseDropdown}
        >
          <GVScroll autoHeight>
            <div className="dashboard-request-popover">
              {inRequests.requests.map(x => (
                <DashboardRequest
                  key={x.id}
                  request={x}
                  cancelRequest={service.cancelRequest}
                  onApplyCancelRequest={this.handleCloseDropdown}
                />
              ))}
            </div>
          </GVScroll>
        </Popover>
      </>
    );
  };

  render() {
    return <div className="dashboard-request">{this.renderRequest()}</div>;
  }
}

const mapStateToProps = (
  state: InvestorRootState | ManagerRootState
): StateProps => {
  const { data, isPending } = state.dashboard.inRequestsData;
  return { inRequests: data, isPending };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: Props
): DispatchProps => {
  const { getInRequests, cancelRequest } = props;
  return {
    service: bindActionCreators({ getInRequests, cancelRequest }, dispatch)
  };
};

interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    InjectedTranslateProps {}

interface OwnProps {
  getInRequests: () => void;
  cancelRequest: (x: CancelRequestType) => void;
}

interface StateProps {
  inRequests: ProgramRequests;
  isPending: boolean;
}

interface DispatchProps {
  service: {
    getInRequests: () => void;
    cancelRequest: (x: CancelRequestType) => void;
  };
}

type State = {
  anchor?: HTMLElement;
};

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardInRequestsContainer);
