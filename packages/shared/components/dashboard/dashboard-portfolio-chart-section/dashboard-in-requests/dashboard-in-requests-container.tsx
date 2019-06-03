import "./dashboard-in-requests.scss";

import { ProgramRequests } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { ResolveThunks, connect } from "react-redux";
import {
  ActionCreatorsMapObject,
  Dispatch,
  bindActionCreators,
  compose
} from "redux";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import GVScroll from "shared/components/scroll/gvscroll";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import withRole, { WithRoleProps } from "shared/decorators/withRole";
import { formatCurrencyValue } from "shared/utils/formatter";
import { AuthRootState } from "shared/utils/types";

import { CancelRequestType } from "../../dashboard.constants";
import DashboardRequest from "./dashboard-request";

class _DashboardInRequestsContainer extends React.PureComponent<Props, State> {
  state = {
    anchor: undefined
  };

  handleOpenDropdown = (event: React.MouseEvent<HTMLElement, MouseEvent>) =>
    this.setState({ anchor: event.currentTarget });

  handleCloseDropdown = () => this.setState({ anchor: undefined });

  render() {
    const { role, inRequests, service, t } = this.props;
    return (
      <div className="dashboard-request">
        <StatisticItem
          label={t(`${role}.dashboard-page.chart-section.in-requests`)}
          big
        >
          <NumberFormat
            value={formatCurrencyValue(inRequests.totalValue, "GVT")}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
          <ActionsCircleIcon
            condition={inRequests.requests.length !== 0}
            className="dashboard-request__icon"
            primary={this.state.anchor !== undefined}
            onClick={this.handleOpenDropdown}
            dashboard__portfolio-events-aside
          />
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
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  { cancelRequest }: OwnProps
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { cancelRequest },
    dispatch
  )
});

interface Props
  extends OwnProps,
    DispatchProps,
    InjectedTranslateProps,
    WithRoleProps {}

interface OwnProps {
  cancelRequest: CancelRequestType;
  inRequests: ProgramRequests;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  cancelRequest: CancelRequestType;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface State {
  anchor?: HTMLElement;
}

const DashboardInRequestsContainer = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withRole,
  withLoader,
  translate(),
  connect<null, DispatchProps, OwnProps, AuthRootState>(
    null,
    mapDispatchToProps
  )
)(_DashboardInRequestsContainer);
export default DashboardInRequestsContainer;
