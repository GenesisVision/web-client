import "./details-investment.scss";

import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
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
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import { PROGRAM, STATUS } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { currencySelector } from "shared/reducers/account-settings-reducer";
import { formatCurrencyValue, roundPercents } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

import { InvestmentDetails } from "./details-investment.helpers";

const _Investment: React.FC<Props> = ({
  updateDescription,
  id,
  assetCurrency,
  asset,
  notice,
  personalDetails,
  WithdrawContainer,
  ProgramReinvestingWidget
}) => {
  const accountCurrency = useSelector(currencySelector);
  const [t] = useTranslation();
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const profitValue = personalDetails.value - personalDetails.invested;
  return (
    <div className="details-investment__block details-investment__block--investment">
      <div className="details-investment__heading">
        <h5>{t("program-details-page.description.investment-details")}</h5>
      </div>
      <div className="details-investment__current-period-investment-data">
        <div className="details-investment__short-statistic details-investment__short-statistic--investment">
          <StatisticItem
            className="details-investment__statistic-item"
            accent
            label={t("fund-details-page.description.value")}
          >
            <NumberFormat
              value={formatCurrencyValue(personalDetails.value, assetCurrency)}
              suffix={` ${assetCurrency}`}
              displayType="text"
            />
          </StatisticItem>
          <StatisticItem
            className="details-investment__statistic-item"
            condition={asset === PROGRAM}
            accent
            label={
              <TooltipLabel
                tooltipContent={t("program-details-page.tooltip.profit")}
                labelText={t("fund-details-page.description.profit")}
              />
            }
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
            className="details-investment__statistic-item"
            accent
            label={
              <TooltipLabel
                tooltipContent={t(`fund-details-page.tooltip.status.${asset}`)}
                labelText={t("fund-details-page.description.status")}
              />
            }
          >
            <AssetStatus
              status={personalDetails.status as STATUS}
              id={id}
              asset={asset}
              onCancel={updateDescription}
            />
          </StatisticItem>
          <StatisticItem
            className="details-investment__statistic-item"
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
            className="details-investment__statistic-item"
            condition={
              personalDetails.pendingOutput !== undefined &&
              personalDetails.pendingOutput !== 0
            }
            accent
            label={t("fund-details-page.description.pending-output")}
          >
            {personalDetails.pendingOutputIsWithdrawAll ? (
              t("withdraw-program.withdrawing-all")
            ) : (
              <NumberFormat
                value={formatCurrencyValue(
                  personalDetails.pendingOutput,
                  assetCurrency
                )}
                suffix={` ${assetCurrency}`}
                displayType="text"
              />
            )}
          </StatisticItem>
        </div>
        <div className="details-investment__footer">
          <GVButton
            color="secondary"
            variant="outlined"
            onClick={setOpenPopup}
            disabled={!personalDetails.canWithdraw}
          >
            {t("fund-details-page.description.withdraw")}
          </GVButton>
          {notice && (
            <p className="details-investment__withdraw-notice">{notice}</p>
          )}
          <WithdrawContainer
            open={isOpenPopup}
            id={id}
            accountCurrency={accountCurrency}
            assetCurrency={assetCurrency}
            onClose={setClosePopup}
            onSubmit={updateDescription}
          />
        </div>
      </div>
    </div>
  );
};

interface OwnProps {
  updateDescription: () => void;
  asset: string;
  notice?: string;
  id: string;
  assetCurrency: CurrencyEnum;
  personalDetails: InvestmentDetails;
  WithdrawContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  ProgramReinvestingWidget?: React.ComponentType<
    IProgramReinvestingContainerOwnProps
  >;
}

interface Props extends OwnProps {}

const Investment = React.memo(_Investment);
export default Investment;
