import "./fund-details-investment.scss";

import ProgramStatus from "components/program-status/program-status";
import Surface from "components/surface/surface";
import { GVButton } from "gv-react-components";
import FundWithdrawContainer from "modules/fund-withdraw/fund-withdraw-container";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatValue } from "utils/formatter";

class FundDetailsInvestment extends PureComponent {
  state = {
    isOpenWithdrawalPopup: false
  };

  handleOpenWithdrawalPopup = () => {
    this.setState({ isOpenWithdrawalPopup: true });
  };

  handleCloseWithdrawalPopup = () => {
    this.props.onChangeInvestmentStatus();
    this.setState({ isOpenWithdrawalPopup: false });
  };

  render() {
    const {
      t,
      className,
      fundId,
      investedAmount,
      balanceCurrency,
      profitPercent,
      status,
      value,
      pendingInput,
      pendingOutput
    } = this.props;
    return (
      <Surface className={"fund-details-investment " + className}>
        <div className="fund-details-investment__heading">
          {t("fund-details-page.description.yourInvestment")}
        </div>
        <div className="fund-details-investment__short-statistic">
          <div className="fund-details-investment__short-statistic-item">
            <span className="fund-details-investment__short-statistic-subheading">
              {t("fund-details-page.description.invested")}
            </span>

            <NumberFormat
              value={formatValue(investedAmount)}
              suffix={` ${balanceCurrency}`}
              displayType="text"
            />
          </div>
          <div className="fund-details-investment__short-statistic-item">
            <span className="fund-details-investment__short-statistic-subheading">
              {t("fund-details-page.description.value")}
            </span>
            <NumberFormat
              value={formatValue(value)}
              suffix={` ${balanceCurrency}`}
              displayType="text"
            />
          </div>
          <div className="fund-details-investment__short-statistic-item">
            <span className="fund-details-investment__short-statistic-subheading">
              {t("fund-details-page.description.profit")}
            </span>
            <NumberFormat
              value={profitPercent}
              suffix=" %"
              displayType="text"
            />
          </div>
          <div className="fund-details-investment__short-statistic-item">
            <span className="fund-details-investment__short-statistic-subheading">
              {t("fund-details-page.description.status")}
            </span>
            <ProgramStatus status={status} />
          </div>
          {pendingInput !== 0 && (
            <div className="fund-details-investment__short-statistic-item">
              <span className="fund-details-investment__short-statistic-subheading">
                {t("fund-details-page.description.pending-input")}
              </span>
              <NumberFormat
                value={formatValue(pendingInput)}
                suffix={` ${balanceCurrency}`}
                displayType="text"
              />
            </div>
          )}
          {pendingOutput !== 0 && (
            <div className="fund-details-investment__short-statistic-item">
              <span className="fund-details-investment__short-statistic-subheading">
                {t("fund-details-page.description.pending-output")}
              </span>
              <NumberFormat
                value={formatValue(pendingOutput)}
                suffix={` ${balanceCurrency}`}
                displayType="text"
              />
            </div>
          )}
        </div>
        <div className="fund-details-investment__footer">
          <GVButton
            color="secondary"
            variant="outlined"
            onClick={this.handleOpenWithdrawalPopup}
          >
            {t("fund-details-page.description.withdraw")}
          </GVButton>
          <FundWithdrawContainer
            open={this.state.isOpenWithdrawalPopup}
            id={fundId}
            onClose={this.handleCloseWithdrawalPopup}
          />
          <p className="fund-details-investment__withdraw-notice">
            {t("fund-details-page.description.withdraw-notice-text")}
          </p>
        </div>
      </Surface>
    );
  }
}

export default translate()(FundDetailsInvestment);
