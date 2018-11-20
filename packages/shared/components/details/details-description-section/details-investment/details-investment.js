import "./details-investment.scss";

import { GVButton } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import ProgramStatus from "shared/components/program-status/program-status";
import Surface from "shared/components/surface/surface";
import { formatValue } from "shared/utils/formatter";

import DetailsStatisticItem from "../../../details-statistic-item/details-statistic-item";

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
          <DetailsStatisticItem
            accent
            label={t("fund-details-page.description.value")}
          >
            <NumberFormat
              value={formatValue(value)}
              suffix={` ${balanceCurrency}`}
              displayType="text"
            />
          </DetailsStatisticItem>
          <DetailsStatisticItem
            accent
            label={t("fund-details-page.description.status")}
          >
            <ProgramStatus status={status} />
          </DetailsStatisticItem>
          {pendingInput !== undefined && pendingInput !== 0 && (
            <DetailsStatisticItem
              accent
              label={t("fund-details-page.description.pending-input")}
            >
              <NumberFormat
                value={formatValue(pendingInput)}
                suffix={` ${balanceCurrency}`}
                displayType="text"
              />
            </DetailsStatisticItem>
          )}
          {pendingOutput !== undefined && pendingOutput !== 0 && (
            <DetailsStatisticItem
              accent
              label={t("fund-details-page.description.pending-output")}
            >
              <NumberFormat
                value={formatValue(pendingOutput)}
                suffix={` ${balanceCurrency}`}
                displayType="text"
              />
            </DetailsStatisticItem>
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
            <p className="details-investment__withdraw-notice">{notice}</p>
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
