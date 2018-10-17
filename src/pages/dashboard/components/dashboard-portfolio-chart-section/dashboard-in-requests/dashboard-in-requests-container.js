import "./dashboard-in-requests.scss";

import Profitability from "components/profitability/profitability";
import moment from "moment";
import React, { PureComponent } from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getInRequests } from "../../../services/dashboard-in-requests.service";
import PortfolioEventLogo from "../../dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { composeEventLogoType } from "../../dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";

const composeRequestValue = (value, type) => {
  if (type === "Invest") return -value;
  return value;
};

class DashboardInRequestsContainer extends PureComponent {
  componentDidMount() {
    const { service } = this.props;
    service.getInRequests();
  }

  render() {
    const { inRequests, isPending } = this.props;
    if (!inRequests || isPending) return null;

    return (
      <div>
        <div>In Requests: {inRequests.totalValue} GVT</div>
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
                <div className="dashboard-request-popover__label">{x.type}</div>
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
            </div>
          ))}
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardInRequestsContainer);
