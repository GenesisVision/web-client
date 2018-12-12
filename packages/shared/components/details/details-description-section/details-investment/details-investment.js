import "./details-investment.scss";

import { GVButton } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import AssetStatus from "shared/components/asset-status/asset-status";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Surface from "shared/components/surface/surface";
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

  handleOnCancelRequest = () => {
    this.props.onChangeInvestmentStatus();
  };

  render() {
    const {
      t,
      role,
      asset,
      notice,
      WithdrawContainer,
      canWithdraw,
      assetCurrency,
      className,
      id,
      balanceCurrency,
      status,
      value,
      pendingInput,
      pendingOutput
    } = this.props;
    return (
      <Surface
        className={
          "surface--horizontal-paddings details-investment " + className
        }
      >
        <h3>{t("fund-details-page.description.yourInvestment")}</h3>
        <div className="details-investment__short-statistic">
          <StatisticItem
            accent
            label={t("fund-details-page.description.value")}
          >
            <NumberFormat
              value={formatValue(value)}
              suffix={` ${balanceCurrency}`}
              displayType="text"
            />
          </StatisticItem>
          <StatisticItem
            accent
            label={t("fund-details-page.description.status")}
          >
            <AssetStatus
              status={status}
              id={id}
              role={role}
              asset={asset}
              onCancel={this.handleOnCancelRequest}
            />
          </StatisticItem>
          {pendingInput !== undefined && pendingInput !== 0 && (
            <StatisticItem
              accent
              label={t("fund-details-page.description.pending-input")}
            >
              <NumberFormat
                value={formatValue(pendingInput)}
                suffix={` ${balanceCurrency}`}
                displayType="text"
              />
            </StatisticItem>
          )}
          {pendingOutput !== undefined && pendingOutput !== 0 && (
            <StatisticItem
              accent
              label={t("fund-details-page.description.pending-output")}
            >
              <NumberFormat
                value={formatValue(pendingOutput)}
                suffix={` ${balanceCurrency}`}
                displayType="text"
              />
            </StatisticItem>
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
