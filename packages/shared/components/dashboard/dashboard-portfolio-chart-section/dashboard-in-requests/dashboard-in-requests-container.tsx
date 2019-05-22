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
import { DashboardChartRequestLoader } from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loaders";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import GVScroll from "shared/components/scroll/gvscroll";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ROLE_ENV } from "shared/constants/constants";
import withLoader from "shared/decorators/with-loader";
import { formatCurrencyValue } from "shared/utils/formatter";
import { AuthRootState } from "shared/utils/types";

import DashboardRequest from "./dashboard-request";
import {
  CancelRequestType,
  GetInRequestsType
} from "../../dashboard.constants";

class _DashboardInRequestsContainer extends React.PureComponent<Props, State> {
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

  render() {
    const { inRequests, isPending, service } = this.props;
    return (
      <div className="dashboard-request">
        <Request
          condition={!!inRequests && !isPending}
          loader={<DashboardChartRequestLoader />}
          inRequests={inRequests}
          isPending={isPending}
          service={service}
          handleOpenDropdown={this.handleOpenDropdown}
          handleCloseDropdown={this.handleCloseDropdown}
          anchor={this.state.anchor}
        />
      </div>
    );
  }
}

const _Request: React.FC<IRequestProps> = ({
  t,
  inRequests,
  isPending,
  service,
  handleOpenDropdown,
  handleCloseDropdown,
  anchor
}) => (
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
      <ActionsCircleIcon
        condition={inRequests.requests.length !== 0}
        className="dashboard-request__icon"
        primary={anchor !== undefined}
        onClick={handleOpenDropdown}
        dashboard__portfolio-events-aside
      />
    </StatisticItem>
    <Popover
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      vertical={VERTICAL_POPOVER_POS.BOTTOM}
      anchorEl={anchor}
      noPadding
      onClose={handleCloseDropdown}
    >
      <GVScroll autoHeight>
        <div className="dashboard-request-popover">
          {inRequests.requests.map(x => (
            <DashboardRequest
              key={x.id}
              request={x}
              cancelRequest={service.cancelRequest}
              onApplyCancelRequest={handleCloseDropdown}
            />
          ))}
        </div>
      </GVScroll>
    </Popover>
  </>
);
const Request = withLoader(React.memo(translate()(_Request)));

interface IRequestProps
  extends InjectedTranslateProps,
    DispatchProps,
    StateProps,
    State {
  handleOpenDropdown: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  handleCloseDropdown: () => void;
}

const mapStateToProps = (state: AuthRootState): StateProps => {
  const { data, isPending } = state.dashboard.inRequestsData;
  return { inRequests: data, isPending };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { getInRequests, cancelRequest }: OwnProps
): DispatchProps => ({
  service: bindActionCreators<ServiceThunks, ResolveThunks<ServiceThunks>>(
    { getInRequests, cancelRequest },
    dispatch
  )
});

interface Props
  extends OwnProps,
    StateProps,
    DispatchProps,
    InjectedTranslateProps {}

interface OwnProps {
  getInRequests: GetInRequestsType;
  cancelRequest: CancelRequestType;
}

interface StateProps {
  inRequests: ProgramRequests;
  isPending: boolean;
}

interface ServiceThunks extends ActionCreatorsMapObject {
  getInRequests: GetInRequestsType;
  cancelRequest: CancelRequestType;
}
interface DispatchProps {
  service: ResolveThunks<ServiceThunks>;
}

interface State {
  anchor?: HTMLElement;
}

const DashboardInRequestsContainer = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect<StateProps, DispatchProps, OwnProps, AuthRootState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(_DashboardInRequestsContainer);
export default DashboardInRequestsContainer;
