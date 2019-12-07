import "./details-investment.scss";

import AssetStatus from "components/asset-status/asset-status";
import { DetailsInvestmentBlock } from "components/details/details-description-section/details-investment/blocks/details-investment-block";
import { DetailsInvestmentFooter } from "components/details/details-description-section/details-investment/blocks/details-investment-footer";
import { DetailsInvestmentHeading } from "components/details/details-description-section/details-investment/blocks/details-investment-title";
import { GV_BTN_SIZE } from "components/gv-button";
import Profitability from "components/profitability/profitability";
import {
  PROFITABILITY_PREFIX,
  PROFITABILITY_VARIANT
} from "components/profitability/profitability.helper";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import ProgramReinvestingContainer from "modules/program-reinvesting/components/program-reinvesting-container";
import WithdrawButton from "modules/withdraw/withdraw.button";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { ASSET, STATUS } from "shared/constants/constants";
import { formatCurrencyValue, roundPercents } from "utils/formatter";
import { CurrencyEnum, FeesType } from "utils/types";

import { InvestmentType } from "./details-investment.helpers";

const _Investment: React.FC<Props> = ({
  fees,
  updateDescription,
  id,
  assetCurrency,
  asset,
  notice,
  personalDetails
}) => {
  const {
    successFeePersonal,
    successFeeCurrent,
    exitFee,
    exitFeePersonal,
    entryFeeCurrent
  } = fees;
  const [t] = useTranslation();
  const profitValue = personalDetails.value - 0; // personalDetails.invested
  return (
    <DetailsInvestmentBlock>
      <DetailsInvestmentHeading>
        {t("program-details-page.description.investment-details")}
      </DetailsInvestmentHeading>
      <StatisticItemList className="details-investment__short-statistic">
        <StatisticItem accent label={t("fund-details-page.description.value")}>
          <NumberFormat
            value={formatCurrencyValue(personalDetails.value, assetCurrency)}
            suffix={` ${assetCurrency}`}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem
          condition={asset === ASSET.PROGRAM}
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
            value={`${0}`} // personalDetails.profit
            variant={PROFITABILITY_VARIANT.CHIPS}
          >
            {roundPercents(0)}
          </Profitability>
        </StatisticItem>
        <StatisticItem
          condition={
            false && // personalDetails.invested !== 0
            successFeePersonal !== undefined &&
            successFeePersonal !== null
          }
          label={t("program-details-page.description.successFee")}
          accent
        >
          <NumberFormat
            value={successFeePersonal}
            suffix={` %`}
            allowNegative={false}
            displayType="text"
          />
        </StatisticItem>
        <StatisticItem
          condition={
            exitFeePersonal !== null &&
            exitFeePersonal !== undefined &&
            exitFee !== exitFeePersonal
          }
          label={t("fund-details-page.description.exitFee")}
          accent
        >
          <NumberFormat
            value={exitFeePersonal}
            suffix={` %`}
            allowNegative={false}
            displayType="text"
          />
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
            successFee={successFeeCurrent}
            exitFee={exitFee !== exitFeePersonal}
            entryFee={entryFeeCurrent}
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
        {"isReinvest" in personalDetails &&
          personalDetails.isInvested &&
          personalDetails.canInvest && (
            <StatisticItem label={"Reinvesting"} hideLabel>
              <ProgramReinvestingContainer
                id={id}
                isReinvesting={personalDetails.isReinvest}
              />
            </StatisticItem>
          )}
        <StatisticItem
          condition={
            personalDetails.pendingOutput !== undefined &&
            personalDetails.pendingOutput !== 0
          }
          accent
          label={t("fund-details-page.description.pending-output")}
        >
          {false ? ( // personalDetails.pendingOutputIsWithdrawAll
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
      </StatisticItemList>
      <DetailsInvestmentFooter>
        <WithdrawButton
          size={GV_BTN_SIZE.BIG}
          disabled={!personalDetails.canWithdraw}
          onApply={updateDescription}
          type={asset}
          id={id}
          currency={assetCurrency}
        />
        {notice && (
          <p className="details-investment__withdraw-notice">{notice}</p>
        )}
      </DetailsInvestmentFooter>
    </DetailsInvestmentBlock>
  );
};

interface Props {
  fees: FeesType;
  updateDescription: () => void;
  asset: ASSET;
  notice?: string;
  id: string;
  assetCurrency: CurrencyEnum;
  personalDetails: InvestmentType;
}

const Investment = React.memo(_Investment);
export default Investment;
