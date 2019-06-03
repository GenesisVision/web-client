import "./details-investment.scss";

import React, { PureComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import AssetStatus from "shared/components/asset-status/asset-status";
import { IFundWithdrawalContainerProps } from "shared/components/funds/fund-details/fund-details.types";
import GVButton from "shared/components/gv-button";
import Profitability from "shared/components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "shared/components/profitability/profitability.helper";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Surface from "shared/components/surface/surface";
import { PROGRAM, STATUS } from "shared/constants/constants";
import { formatCurrencyValue, roundPercents } from "shared/utils/formatter";

import {
  IProgramDetailContext,
  ProgramDetailContext
} from "../../helpers/details-context";
import { InvestmentDetails } from "./details-investment.helpers";

interface IDetailsInvestmentOwnProps {
  asset: string;
  notice?: string;
  id: string;
  accountCurrency: string;
  assetCurrency: string;
  personalDetails: InvestmentDetails;
  WithdrawContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  ProgramReinvestingWidget?: React.ComponentType<
    IProgramReinvestingContainerOwnProps
  >;
}

interface IDetailsInvestmentProps
  extends IDetailsInvestmentOwnProps,
    InjectedTranslateProps {}
interface IDetailsInvestmentState {
  isOpenWithdrawalPopup: boolean;
}

class DetailsInvestment extends PureComponent<
  IDetailsInvestmentProps,
  IDetailsInvestmentState
> {
  constructor(props: IDetailsInvestmentProps) {
    super(props);
    this.state = {
      isOpenWithdrawalPopup: false
    };
  }

  handleOpenWithdrawalPopup = () => {
    this.setState({ isOpenWithdrawalPopup: true });
  };

  handleCloseWithdrawalPopup = () => {
    this.setState({ isOpenWithdrawalPopup: false });
  };

  render() {
    const {
      t,
      id,
      assetCurrency,
      accountCurrency,
      asset,
      notice,
      personalDetails,
      WithdrawContainer,
      ProgramReinvestingWidget
    } = this.props;

    const profitValue = personalDetails.value - personalDetails.invested;

    return (
      <ProgramDetailContext.Consumer>
        {({ updateDetails }: IProgramDetailContext) => (
          <Surface className="surface--horizontal-paddings details-investment">
            <h3>
              {t(`fund-details-page.description.yourInvestment.${asset}`)}
            </h3>
            <div className="details-investment__short-statistic">
              <StatisticItem
                accent
                label={t("fund-details-page.description.value")}
              >
                <NumberFormat
                  value={formatCurrencyValue(
                    personalDetails.value,
                    assetCurrency
                  )}
                  suffix={` ${assetCurrency}`}
                  displayType="text"
                />
              </StatisticItem>
              <StatisticItem
                condition={asset === PROGRAM}
                accent
                label={t("fund-details-page.description.profit")}
                labelTooltip={t("program-details-page.tooltip.profit")}
              >
                <Profitability
                  value={formatCurrencyValue(profitValue, assetCurrency)}
                  prefix={PROFITABILITY_PREFIX.SIGN}
                >
                  <NumberFormat
                    value={formatCurrencyValue(profitValue, assetCurrency)}
                    suffix={` ${assetCurrency}`}
                    allowNegative={false}
                    displayType="text"
                  />
                </Profitability>
                <Profitability
                  value={`${personalDetails.profit}`}
                  variant={PROFITABILITY_VARIANT.CHIPS}
                >
                  {roundPercents(personalDetails.profit)}
                </Profitability>
              </StatisticItem>
              <StatisticItem
                accent
                label={t("fund-details-page.description.status")}
                labelTooltip={t(`fund-details-page.tooltip.status.${asset}`)}
              >
                <AssetStatus
                  status={personalDetails.status as STATUS}
                  id={id}
                  asset={asset}
                  onCancel={updateDetails}
                />
              </StatisticItem>
              <StatisticItem
                condition={
                  personalDetails.pendingInput !== undefined &&
                  personalDetails.pendingInput !== 0
                }
                accent
                label={t("fund-details-page.description.pending-input")}
              >
                <NumberFormat
                  value={formatCurrencyValue(
                    personalDetails.pendingInput,
                    assetCurrency
                  )}
                  suffix={` ${assetCurrency}`}
                  displayType="text"
                />
              </StatisticItem>
              {ProgramReinvestingWidget &&
                personalDetails.isInvested &&
                personalDetails.canInvest && (
                  <ProgramReinvestingWidget
                    programId={id}
                    isReinvesting={personalDetails.isReinvest}
                  />
                )}
              <StatisticItem
                condition={
                  personalDetails.pendingOutput !== undefined &&
                  personalDetails.pendingOutput !== 0
                }
                accent
                label={t("fund-details-page.description.pending-output")}
              >
                <NumberFormat
                  value={formatCurrencyValue(
                    personalDetails.pendingOutput,
                    assetCurrency
                  )}
                  suffix={` ${assetCurrency}`}
                  displayType="text"
                />
              </StatisticItem>
            </div>
            <div className="details-investment__footer">
              <GVButton
                color="secondary"
                variant="outlined"
                onClick={this.handleOpenWithdrawalPopup}
                disabled={!personalDetails.canWithdraw}
              >
                {t("fund-details-page.description.withdraw")}
              </GVButton>
              {notice && (
                <p className="details-investment__withdraw-notice">{notice}</p>
              )}
              <WithdrawContainer
                open={this.state.isOpenWithdrawalPopup}
                id={id}
                accountCurrency={accountCurrency}
                assetCurrency={assetCurrency}
                onClose={this.handleCloseWithdrawalPopup}
                onSubmit={updateDetails}
              />
            </div>
          </Surface>
        )}
      </ProgramDetailContext.Consumer>
    );
  }
}

export default translate()(DetailsInvestment);
