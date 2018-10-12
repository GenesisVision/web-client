import "./fund-details-investment.scss";

import ProgramStatus from "components/program-status/program-status";
import Surface from "components/surface/surface";
import { GVButton } from "gv-react-components";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";

class FundDetailsInvestment extends PureComponent {
  state = {
    isOpenWithdrawalPopup: false
  };

  handleOpenWithdrawalPopup = () => {
    this.setState({ isOpenWithdrawalPopup: true });
  };

  handleCloseWithdrawalPopup = () => {
    this.setState({ isOpenWithdrawalPopup: false });
  };

  render() {
    const {
      t,
      className,
      programId,
      investedAmount,
      balanceAmount,
      balanceCurrency,
      profitPercent,
      status
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
              value={investedAmount}
              suffix={" GVT"}
              displayType="text"
            />
          </div>
          <div className="fund-details-investment__short-statistic-item">
            <span className="fund-details-investment__short-statistic-subheading">
              {t("fund-details-page.description.value")}
            </span>
            <NumberFormat
              value={balanceAmount}
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
        </div>
        <div className="fund-details-investment__footer">
          <GVButton
            color="secondary"
            variant="outlined"
            onClick={this.handleOpenWithdrawalPopup}
          >
            {t("fund-details-page.description.withdraw")}
          </GVButton>
          <ProgramWithdrawContainer
            open={this.state.isOpenWithdrawalPopup}
            id={programId}
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
