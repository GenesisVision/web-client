import { GVButton } from "gv-react-components";
import moment from "moment";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import PortfolioEventLogo from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import { formatCurrencyValue } from "shared/utils/formatter";

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
    const {
      request,
      cancelRequest,
      onApplyCancelRequest,
      role,
      asset
    } = this.props;
    const onFinally = () => {
      this.handleCloseConfirmPopup();
      onApplyCancelRequest();
    };
    cancelRequest({
      id: request.id,
      type: request.programType,
      onFinally,
      role,
      asset
    });
  };

  render() {
    const { isConfirmPopupOpen } = this.state;
    const { t, request } = this.props;
    return (
      <div className="dashboard-request-popover__request">
        <div className="dashboard-request-popover__logo">
          <PortfolioEventLogo
            type={request.type}
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
            <NumberFormat
              value={formatCurrencyValue(request.value, request.currency)}
              decimalScale={8}
              displayType="text"
              allowNegative={false}
              suffix={` ${request.currency}`}
            />
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
            className="dialog--wider"
          />
        </div>
      </div>
    );
  }
}

export default translate()(DashboardRequest);
