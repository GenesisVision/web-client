import "./dashboard-in-requests.scss";

import React, { Fragment, PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { DashboardChartRequestLoader } from "shared/components/dashboard/dashboard-chart-loader/dashboard-chart-loaders";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover from "shared/components/popover/popover";
import GVScroll from "shared/components/scroll/gvscroll";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

import DashboardRequest from "./dashboard-request";

class DashboardInRequestsContainer extends PureComponent {
  state = {
    anchor: null
  };

  componentDidMount() {
    const { service } = this.props;
    service.getInRequests();
  }

  handleOpenDropdown = event => this.setState({ anchor: event.currentTarget });
  handleCloseDropdown = () => this.setState({ anchor: null });

  renderActionsIcon = () => {
    if (this.props.inRequests.requests.length === 0) return null;
    return (
      <ActionsCircleIcon
        className="dashboard-request__icon"
        primary={this.state.anchor !== null}
        onClick={this.handleOpenDropdown}
      />
    );
  };

  renderRequest = () => {
    const { t, inRequests, isPending, service } = this.props;
    if (!inRequests || isPending) return <DashboardChartRequestLoader />;
    return (
      <Fragment>
        <StatisticItem
          label={t(
            `${
              process.env.REACT_APP_PLATFORM
            }.dashboard-page.chart-section.in-requests`
          )}
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
          horizontal="right"
          vertical="bottom"
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
      </Fragment>
    );
  };

  render() {
    return <div className="dashboard-request">{this.renderRequest()}</div>;
  }
}

const mapStateToProps = state => {
  const { data, isPending } = state.dashboard.inRequestsData;
  return { inRequests: data, isPending };
};

const mapDispatchToProps = (dispatch, props) => {
  const { getInRequests, cancelRequest } = props;
  return {
    service: bindActionCreators({ getInRequests, cancelRequest }, dispatch)
  };
};

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardInRequestsContainer);
