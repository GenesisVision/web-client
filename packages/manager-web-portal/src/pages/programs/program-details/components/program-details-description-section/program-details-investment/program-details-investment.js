import "./program-details-investment.scss";

import ProgramStatus from "shared/components/program-status/program-status";
import Surface from "shared/components/surface/surface";
import { GVButton } from "gv-react-components";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatValue } from "utils/formatter";

class ProgramDetailsInvestment extends PureComponent {
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
      canWithdraw,
      className,
      programId,
      investedAmount,
      balanceCurrency,
      profitPercent,
      status,
      value,
      programCurrency,
      pendingInput,
      pendingOutput
    } = this.props;
    return (
      <Surface className={"program-details-investment " + className}>
        <div className="program-details-investment__heading">
          {t("program-details-page.description.yourInvestment")}
        </div>
        <div className="program-details-investment__short-statistic-container">
          <div className="program-details-investment__short-statistic">
            <div className="program-details-investment__short-statistic-item">
              <span className="program-details-investment__short-statistic-subheading">
                {t("program-details-page.description.invested")}
              </span>

              <NumberFormat
                value={formatValue(investedAmount)}
                suffix={` ${balanceCurrency}`}
                displayType="text"
              />
            </div>
            <div className="program-details-investment__short-statistic-item">
              <span className="program-details-investment__short-statistic-subheading">
                {t("program-details-page.description.value")}
              </span>
              <NumberFormat
                value={formatValue(value)}
                suffix={` ${balanceCurrency}`}
                displayType="text"
              />
            </div>
          </div>
          <div className="program-details-investment__short-statistic">
            <div className="program-details-investment__short-statistic-item">
              <span className="program-details-investment__short-statistic-subheading">
                {t("program-details-page.description.profit")}
              </span>
              <NumberFormat
                value={formatValue(profitPercent, 2)}
                suffix=" %"
                displayType="text"
              />
            </div>
            <div className="program-details-investment__short-statistic-item">
              <span className="program-details-investment__short-statistic-subheading">
                {t("program-details-page.description.status")}
              </span>
              <ProgramStatus status={status} />
            </div>
            {pendingInput !== 0 && (
              <div className="program-details-investment__short-statistic-item">
                <span className="program-details-investment__short-statistic-subheading">
                  {t("program-details-page.description.pending-input")}
                </span>
                <NumberFormat
                  value={formatValue(pendingInput)}
                  suffix={` ${balanceCurrency}`}
                  displayType="text"
                />
              </div>
            )}
            {pendingOutput !== 0 && (
              <div className="program-details-investment__short-statistic-item">
                <span className="program-details-investment__short-statistic-subheading">
                  {t("program-details-page.description.pending-output")}
                </span>
                <NumberFormat
                  value={formatValue(pendingOutput)}
                  suffix={` ${balanceCurrency}`}
                  displayType="text"
                />
              </div>
            )}
          </div>
        </div>
        <div className="program-details-investment__footer">
          <GVButton
            color="secondary"
            variant="outlined"
            disabled={!canWithdraw}
            onClick={this.handleOpenWithdrawalPopup}
          >
            {t("program-details-page.description.withdraw")}
          </GVButton>
          <ProgramWithdrawContainer
            open={this.state.isOpenWithdrawalPopup}
            id={programId}
            programCurrency={programCurrency}
            onClose={this.handleCloseWithdrawalPopup}
          />
          <p className="program-details-investment__withdraw-notice">
            {t("program-details-page.description.withdraw-notice-text")}
          </p>
        </div>
      </Surface>
    );
  }
}

export default translate()(ProgramDetailsInvestment);
