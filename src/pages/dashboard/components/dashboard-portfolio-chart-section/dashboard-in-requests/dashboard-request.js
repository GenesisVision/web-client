import ConfirmPopup from "components/confirm-popup/confirm-popup";
import Profitability from "components/profitability/profitability";
import { GVButton } from "gv-react-components";
import moment from "moment";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

import PortfolioEventLogo from "../../dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { composeEventLogoType } from "../../dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";

const composeRequestValue = (value, type) => {
  if (type === "Invest") return -value;
  return value;
};
class DashboardRequest extends Component {
  state = {
    isConfirmPopupOpen: false
  };

  handleCancelRequestClick = () => {
    this.handleOpenConfirmPopup();
  };

  handleOpenConfirmPopup = () => this.setState({ isConfirmPopupOpen: true });
  handleCloseConfirmPopup = () => this.setState({ isConfirmPopupOpen: false });
  handleApplyCancelRequest = () => {
    const { request, cancelRequest, onApplyCancelRequest } = this.props;
    cancelRequest(request.id, request.programType, () => {
      this.handleCloseConfirmPopup();
      onApplyCancelRequest();
    });
  };

  render() {
    const { isConfirmPopupOpen } = this.state;
    const { t, request } = this.props;
    return (
      <div className="dashboard-request-popover__request">
        <div className="dashboard-request-popover__logo">
          <PortfolioEventLogo
            type={composeEventLogoType(request.type)}
            logo={request.logo}
            color={request.color}
          />
        </div>
        <div className="dashboard-request-popover__info">
          <div className="dashboard-request-popover__title">
            {request.title}
          </div>
          <div className="dashboard-request-popover__label">{request.type}</div>
        </div>
        <div className="dashboard-request-popover__value">
          <div className="dashboard-request-popover__profitability">
            <Profitability
              value={composeRequestValue(request.value, request.type)}
              prefix="sign"
            >
              <NumberFormat
                value={request.value}
                decimalScale={8}
                displayType="text"
                allowNegative={false}
                suffix=" GVT"
              />
            </Profitability>
          </div>
          <div className="dashboard-request-popover__label">
            {moment(request.date).format("ll")}
          </div>
        </div>

        <div className="dashboard-request-popover__btns">
          {request.canCancelRequest && (
            <GVButton
              color="primary"
              variant="text"
              onClick={this.handleCancelRequestClick}
            >
              {t("buttons.cancel")}
            </GVButton>
          )}
          <ConfirmPopup
            open={isConfirmPopupOpen}
            onClose={this.handleCloseConfirmPopup}
            onCancel={this.handleCloseConfirmPopup}
            onApply={this.handleApplyCancelRequest}
            header={"Cancel request"}
            body={"Please confirm that you want to cancel the request."}
            applyButtonText={t("buttons.confirm")}
          />
        </div>
      </div>
    );
  }
}

export default translate()(DashboardRequest);
