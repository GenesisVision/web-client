import "./details-investment.scss";

import { GVButton } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import AssetStatus from "shared/components/asset-status/asset-status";
import Profitability from "shared/components/profitability/profitability";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Surface from "shared/components/surface/surface";
import { PROGRAM } from "shared/constants/constants";
import {
  formatCurrencyValue,
  formatValue,
  roundPercents
} from "shared/utils/formatter";

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
      asset,
      notice,
      WithdrawContainer,
      canWithdraw,
      assetCurrency,
      id,
      balanceCurrency,
      status,
      value,
      pendingInput,
      pendingOutput,
      profit,
      invested,
      isInvested,
      canInvest,
      ProgramReinvestingWidget,
      onReinvestingClick,
      isReinvestPending,
      isReinvest
    } = this.props;

    return (
      <Surface className="surface--horizontal-paddings details-investment">
        <h3>{t("fund-details-page.description.yourInvestment")}</h3>
        <div className="details-investment__short-statistic">
          <StatisticItem
            accent
            label={t("fund-details-page.description.value")}
          >
            <NumberFormat
              value={formatCurrencyValue(value, balanceCurrency)}
              suffix={` ${balanceCurrency}`}
              displayType="text"
            />
          </StatisticItem>
          {asset === PROGRAM ? (
            <StatisticItem
              accent
              label={t("fund-details-page.description.profit")}
            >
              <Profitability value={value - invested} prefix="sign">
                <NumberFormat
                  value={formatCurrencyValue(value - invested, balanceCurrency)}
                  suffix={` ${balanceCurrency}`}
                  allowNegative={false}
                  displayType="text"
                />
              </Profitability>
              <Profitability value={profit} variant="chips">
                {roundPercents(profit)}
              </Profitability>
            </StatisticItem>
          ) : null}
          <StatisticItem
            accent
            label={t("fund-details-page.description.status")}
          >
            <AssetStatus
              status={status}
              id={id}
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
                value={formatCurrencyValue(pendingInput, balanceCurrency)}
                suffix={` ${balanceCurrency}`}
                displayType="text"
              />
            </StatisticItem>
          )}
          {ProgramReinvestingWidget && isInvested && canInvest && (
            <ProgramReinvestingWidget
              className="details-description__reinvest"
              toggleReinvesting={onReinvestingClick}
              isReinvesting={isReinvest}
              disabled={isReinvestPending}
            />
          )}
          {pendingOutput !== undefined && pendingOutput !== 0 && (
            <StatisticItem
              accent
              label={t("fund-details-page.description.pending-output")}
            >
              <NumberFormat
                value={formatCurrencyValue(pendingOutput, balanceCurrency)}
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
