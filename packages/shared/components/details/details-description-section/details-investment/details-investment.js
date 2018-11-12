import "./details-investment.scss";

import ProgramStatus from "shared/components/program-status/program-status";
import Surface from "shared/components/surface/surface";
import { GVButton } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatValue } from "shared/utils/formatter";

class DetailsInvestment extends PureComponent {
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
      notice,
      WithdrawContainer,
      canWithdraw,
      assetCurrency,
      className,
      id,
      investedAmount,
      balanceCurrency,
      profitPercent,
      status,
      value,
      pendingInput,
      pendingOutput
    } = this.props;
    return (
      <Surface className={"details-investment " + className}>
        <div className="details-investment__heading">
          {t("fund-details-page.description.yourInvestment")}
        </div>
        <div className="details-investment__short-statistic">
          <div className="details-investment__short-statistic-item">
            <span className="details-investment__short-statistic-subheading">
              {t("fund-details-page.description.invested")}
            </span>

            <NumberFormat
              value={formatValue(investedAmount)}
              suffix={` ${balanceCurrency}`}
              displayType="text"
            />
          </div>
          <div className="details-investment__short-statistic-item">
            <span className="details-investment__short-statistic-subheading">
              {t("fund-details-page.description.value")}
            </span>
            <NumberFormat
              value={formatValue(value)}
              suffix={` ${balanceCurrency}`}
              displayType="text"
            />
          </div>
          <div className="details-investment__short-statistic-item">
            <span className="details-investment__short-statistic-subheading">
              {t("fund-details-page.description.profit")}
            </span>
            <NumberFormat
              value={profitPercent}
              suffix=" %"
              displayType="text"
            />
          </div>
          <div className="details-investment__short-statistic-item">
            <span className="details-investment__short-statistic-subheading">
              {t("fund-details-page.description.status")}
            </span>
            <ProgramStatus status={status} />
          </div>
          {pendingInput !== 0 && (
            <div className="details-investment__short-statistic-item">
              <span className="details-investment__short-statistic-subheading">
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
            <div className="details-investment__short-statistic-item">
              <span className="details-investment__short-statistic-subheading">
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
        <div className="details-investment__footer">
          <GVButton
            color="secondary"
            variant="outlined"
            onClick={this.handleOpenWithdrawalPopup}
            disabled={!canWithdraw}
          >
            {t("fund-details-page.description.withdraw")}
          </GVButton>
          {notice && (
            <p className="details-investment__withdraw-notice">
              {notice}
            </p>
          )}
          <WithdrawContainer
            open={this.state.isOpenWithdrawalPopup}
            id={id}
            onClose={this.handleCloseWithdrawalPopup}
            assetCurrency={assetCurrency}
          />
        </div>
      </Surface>
    );
  }
}

export default translate()(DetailsInvestment);
