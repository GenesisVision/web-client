import "./dashboard-in-requests.scss";

import Popover from "components/popover/popover";
import Profitability from "components/profitability/profitability";
import StatisticItem from "components/statistic-item/statistic-item";
import { GVButton } from "gv-react-components";
import moment from "moment";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

import { ActionsCircleIcon } from "../../../../../components/icon/actions-circle-icon";
import { getInRequests } from "../../../services/dashboard-in-requests.service";
import PortfolioEventLogo from "../../dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { composeEventLogoType } from "../../dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";

const composeRequestValue = (value, type) => {
  if (type === "Invest") return -value;
  return value;
};

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
  cancelRequest = () => {};

  render() {
    const { inRequests, isPending, t } = this.props;
    if (!inRequests || isPending) return null;

    return (
      <div className="dashboard-request">
        <StatisticItem
          heading={"In Requests"}
          value={-inRequests.totalValue}
          adornment={
            <ActionsCircleIcon
              className="dashboard-request__icon"
              primary={this.state.anchor !== null}
              onClick={this.handleOpenDropdown}
            />
          }
        />
        <Popover
          horizontal="right"
          vertical="bottom"
          anchorEl={this.state.anchor}
          noPadding
          onClose={this.handleCloseDropdown}
        >
          <div className="dashboard-request-popover">
            {inRequests.requests.map((x, idx) => (
              <div key={idx} className="dashboard-request-popover__request">
                <div className="dashboard-request-popover__logo">
                  <PortfolioEventLogo
                    type={composeEventLogoType(x.type)}
                    logo={x.logo}
                    color={x.color}
                  />
                </div>
                <div className="dashboard-request-popover__info">
                  <div className="dashboard-request-popover__title">
                    {x.title}
                  </div>
                  <div className="dashboard-request-popover__label">
                    {x.type}
                  </div>
                </div>
                <div className="dashboard-request-popover__value">
                  <div className="dashboard-request-popover__profitability">
                    <Profitability
                      value={composeRequestValue(x.value, x.type)}
                      prefix="sign"
                    >
                      <NumberFormat
                        value={x.value}
                        decimalScale={8}
                        displayType="text"
                        allowNegative={false}
                        suffix=" GVT"
                      />
                    </Profitability>
                  </div>
                  <div className="dashboard-request-popover__label">
                    {moment(x.date).format("ll")}
                  </div>
                </div>

                <div className="dashboard-request-popover__btns">
                  {x.canCancelRequest && (
                    <GVButton
                      color="primary"
                      variant="text"
                      onClick={this.cancelRequest}
                    >
                      {t("buttons.cancel")}
                    </GVButton>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { data, isPending } = state.dashboard.inRequestsData;
  return { inRequests: data, isPending };
};

const mapDispatchToProps = dispatch => {
  return {
    service: bindActionCreators({ getInRequests }, dispatch)
  };
};

export default compose(
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DashboardInRequestsContainer);
