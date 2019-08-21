import "./details-investment.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat from "react-number-format";
import AssetStatus from "shared/components/asset-status/asset-status";
import { IFundWithdrawalContainerProps } from "shared/components/funds/fund-details/fund-details.types";
import GVButton from "shared/components/gv-button";
import Profitability from "shared/components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "shared/components/profitability/profitability.helper";
import SubscriptionDetailsContainer from "shared/components/programs/program-details/program-details-description/subscription-details/subscription-details-container";
import { IProgramReinvestingContainerOwnProps } from "shared/components/programs/program-details/program-details.types";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { TooltipLabel } from "shared/components/tooltip-label/tooltip-label";
import { PROGRAM, STATUS } from "shared/constants/constants";
import useIsOpen from "shared/hooks/is-open.hook";
import { formatCurrencyValue, roundPercents } from "shared/utils/formatter";
import { CurrencyEnum } from "shared/utils/types";

import { InvestmentDetails } from "./details-investment.helpers";

const _Investment: React.FC<Props> = ({
  updateDescription,
  t,
  id,
  assetCurrency,
  accountCurrency,
  asset,
  notice,
  personalDetails,
  WithdrawContainer,
  ProgramReinvestingWidget
}) => {
  const [isOpenPopup, setOpenPopup, setClosePopup] = useIsOpen();
  const profitValue = personalDetails.value - personalDetails.invested;
  return (
    <>
      <div className="details-investment details-investment__short-statistic">
        <StatisticItem accent label={t("fund-details-page.description.value")}>
          <NumberFormat
            value={formatCurrencyValue(personalDetails.value, assetCurrency)}
            suffix={` ${assetCurrency}`}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem
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
      {personalDetails.signalSubscription.hasActiveSubscription && (
        <SubscriptionDetailsContainer
          id={id}
          currency={assetCurrency}
          personalDetails={personalDetails}
        />
      )}
    </>
  );
};

interface OwnProps {
  updateDescription: () => void;
  asset: string;
  notice?: string;
  id: string;
  accountCurrency: CurrencyEnum;
  assetCurrency: CurrencyEnum;
  personalDetails: InvestmentDetails;
  WithdrawContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  ProgramReinvestingWidget?: React.ComponentType<
    IProgramReinvestingContainerOwnProps
  >;
}

interface Props extends OwnProps, WithTranslation {}

const Investment = translate()(React.memo(_Investment));
export default Investment;
