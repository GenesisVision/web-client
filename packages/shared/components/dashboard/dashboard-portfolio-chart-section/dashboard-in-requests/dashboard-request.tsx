import { ProgramRequest } from "gv-api-web";
import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { CancelRequestType } from "shared/components/asset-status/services/asset-status.service";
import ConfirmPopup from "shared/components/confirm-popup/confirm-popup";
import PortfolioEventLogo from "shared/components/dashboard/dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo";
import GVButton from "shared/components/gv-button";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { ASSET, ROLE } from "shared/constants/constants";
import { formatCurrencyValue } from "shared/utils/formatter";

import { EVENT_LOGO_TYPE } from "../../dashboard-portfolio-events/dashboard-portfolio-event-logo/dashboard-portfolio-event-logo.helper";

export interface IDashboardRequestProps extends InjectedTranslateProps {
  request: ProgramRequest;
  cancelRequest(x: CancelRequestType): void;
  onApplyCancelRequest(): void;
  role?: ROLE;
  asset?: ASSET;
}

export interface IDashboardRequestState {
  isConfirmPopupOpen: boolean;
  disabled: boolean;
}

class DashboardRequest extends React.PureComponent<
  IDashboardRequestProps,
  IDashboardRequestState
> {
  state = {
    isConfirmPopupOpen: false,
    disabled: false
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
      role = ROLE.INVESTOR,
      asset = ASSET.PROGRAM
    } = this.props;
    this.setState({ disabled: true });
    const onFinally = () => {
      onApplyCancelRequest();
    };
    const removeDisableBtn = () => {
      this.setState({ disabled: false });
    };
    cancelRequest({
      id: request.id,
      onFinally,
      removeDisableBtn,
      role,
      asset
    });
  };

  render() {
    const { isConfirmPopupOpen, disabled } = this.state;
    const { t, request } = this.props;
    return (
      <div className="dashboard-request-popover__request">
        <div className="dashboard-request-popover__logo">
          <PortfolioEventLogo
            type={request.type as EVENT_LOGO_TYPE}
            logo={request.logo}
            color={request.color}
          />
        </div>
        <StatisticItem
          className={
            "dashboard-request-popover__statistic-item dashboard-request-popover__statistic-item--title"
          }
          label={request.title}
          invert
          accent
        >
          {request.type}
        </StatisticItem>
        <StatisticItem
          className={"dashboard-request-popover__statistic-item"}
          label={
            <NumberFormat
              value={formatCurrencyValue(request.value, request.currency)}
              decimalScale={8}
              displayType="text"
              allowNegative={false}
              suffix={` ${request.currency}`}
            />
          }
          invert
        >
          {moment(request.date).format("ll")}
        </StatisticItem>
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
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
}

export default translate()(DashboardRequest);
