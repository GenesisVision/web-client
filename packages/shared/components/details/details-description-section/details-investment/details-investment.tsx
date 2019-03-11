import "./details-investment.scss";

import { FundDetailsFull, ProgramDetailsFull } from "gv-api-web";
import { GVButton } from "gv-react-components";
import React, { PureComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import AssetStatus from "shared/components/asset-status/asset-status";
import Profitability from "shared/components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "shared/components/profitability/profitability.helper";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import Surface from "shared/components/surface/surface";
import { PROGRAM } from "shared/constants/constants";
import { formatCurrencyValue, roundPercents } from "shared/utils/formatter";

import {
  IProgramDetailContext,
  ProgramDetailContext
} from "../../helpers/details-context";

interface IDetailsInvestmentOwnProps {
  asset: string;
  notice: string;
  programDetails: ProgramDetailsFull | FundDetailsFull;
  WithdrawContainer: any;
  ProgramReinvestingWidget: any;
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
      programDetails,
      asset,
      notice,
      WithdrawContainer,
      ProgramReinvestingWidget
    } = this.props;

    const { personalProgramDetails } = programDetails;

    const canWithdraw =
      personalProgramDetails && personalProgramDetails.canWithdraw;
    const canInvest =
      personalProgramDetails && personalProgramDetails.canInvest;
    const isInvested =
      personalProgramDetails && personalProgramDetails.isInvested;
    const isReinvest =
      personalProgramDetails && personalProgramDetails.isReinvest;
    const pendingInput =
      personalProgramDetails && personalProgramDetails.pendingInput;
    const pendingOutput =
      personalProgramDetails && personalProgramDetails.pendingOutput;

    const status = personalProgramDetails && personalProgramDetails.status;
    const value = personalProgramDetails && personalProgramDetails.value;
    const invested = personalProgramDetails && personalProgramDetails.value;
    const profitPercent =
      personalProgramDetails && personalProgramDetails.profit;
    const profit = value - invested;

    const assetCurrency = programDetails.currency;
    const id = programDetails.id;

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
                  value={formatCurrencyValue(value, assetCurrency)}
                  suffix={` ${assetCurrency}`}
                  displayType="text"
                />
              </StatisticItem>
              {asset === PROGRAM ? (
                <StatisticItem
                  accent
                  label={t("fund-details-page.description.profit")}
                >
                  <Profitability
                    value={profit}
                    prefix={PROFITABILITY_PREFIX.SIGN}
                  >
                    <NumberFormat
                      value={formatCurrencyValue(profit, assetCurrency)}
                      suffix={` ${assetCurrency}`}
                      allowNegative={false}
                      displayType="text"
                    />
                  </Profitability>
                  <Profitability
                    value={profitPercent}
                    variant={PROFITABILITY_VARIANT.CHIPS}
                  >
                    {roundPercents(profitPercent)}
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
                  onCancel={updateDetails}
                />
              </StatisticItem>
              {pendingInput !== undefined && pendingInput !== 0 && (
                <StatisticItem
                  accent
                  label={t("fund-details-page.description.pending-input")}
                >
                  <NumberFormat
                    value={formatCurrencyValue(pendingInput, assetCurrency)}
                    suffix={` ${assetCurrency}`}
                    displayType="text"
                  />
                </StatisticItem>
              )}
              {ProgramReinvestingWidget && isInvested && canInvest && (
                <ProgramReinvestingWidget
                  programId={id}
                  isReinvesting={isReinvest}
                />
              )}
              {pendingOutput !== undefined && pendingOutput !== 0 && (
                <StatisticItem
                  accent
                  label={t("fund-details-page.description.pending-output")}
                >
                  <NumberFormat
                    value={formatCurrencyValue(pendingOutput, assetCurrency)}
                    suffix={` ${assetCurrency}`}
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
                onSubmit={updateDetails}
                assetCurrency={assetCurrency}
              />
            </div>
          </Surface>
        )}
      </ProgramDetailContext.Consumer>
    );
  }
}

export default translate()(DetailsInvestment);
