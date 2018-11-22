import "./dashboard-in-requests.scss";

import React, { PureComponent } from "react";
import Scrollbars from "react-custom-scrollbars";
import { translate } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover from "shared/components/popover/popover";

import DashboardRequest from "./dashboard-request";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";
import NumberFormat from "react-number-format";

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

  render() {
    const { inRequests, isPending, service } = this.props;
    if (!inRequests || isPending) return null;

    return (
      <div className="dashboard-request">
        <StatisticItem label={"In Requests"} big>
          <NumberFormat
            value={formatValue(inRequests.totalValue)}
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
          <Scrollbars autoHeight>
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
          </Scrollbars>
        </Popover>
      </div>
    );
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
