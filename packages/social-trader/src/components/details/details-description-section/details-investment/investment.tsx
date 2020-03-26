import AssetStatus from "components/asset-status/asset-status";
import { DetailsInvestmentBlock } from "components/details/details-description-section/details-investment/blocks/details-investment-block";
import { DetailsInvestmentFooter } from "components/details/details-description-section/details-investment/blocks/details-investment-footer";
import { DetailsInvestmentHeading } from "components/details/details-description-section/details-investment/blocks/details-investment-title";
import { GV_BTN_SIZE } from "components/gv-button";
import { ProfitabilityValuePercent } from "components/profitability/profitability-value-percent";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { ASSET, STATUS } from "constants/constants";
import Crashable from "decorators/crashable";
import ProgramAutoJoin from "modules/program-auto-join/program-auto-join";
import { useAccountCurrency } from "hooks/account-currency.hook";
import ProgramReinvestingContainer from "modules/program-reinvesting/components/program-reinvesting-container";
import WithdrawButton from "modules/withdraw/withdraw.button";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum, FeesType } from "utils/types";

import { InvestmentType } from "./details-investment.helpers";

const _Investment: React.FC<Props> = ({
  isOwnAsset,
  fees,
  updateDescription,
  id,
  assetCurrency,
  asset,
  personalDetails
}) => {
  const { successFeePersonal, exitFee, exitFeePersonal } = fees;
  const accountCurrency = useAccountCurrency();
  const [t] = useTranslation();
  const profitValue = "profit" in personalDetails ? personalDetails.profit : 0;
  const profitPercentValue =
    "profitPercent" in personalDetails ? personalDetails.profitPercent : 0;

  const currency = asset === ASSET.FUND ? accountCurrency : assetCurrency;
  const pendingCurrency =
    asset === ASSET.FUND ? personalDetails.pendingInOutCurrency : assetCurrency;

  return (
    <DetailsInvestmentBlock>
      <DetailsInvestmentHeading>
        {t("program-details-page.description.investment-details")}
      </DetailsInvestmentHeading>
      <StatisticItemList>
        <StatisticItem accent label={t("fund-details-page.description.value")}>
          <NumberFormat
            value={formatCurrencyValue(personalDetails.value, currency)}
            suffix={` ${currency}`}
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
          <ProfitabilityValuePercent
            currency={assetCurrency}
            value={profitValue}
            percent={profitPercentValue}
          />
        </StatisticItem>
        <StatisticItem
          condition={
            personalDetails.isInvested &&
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
              tooltipContent={t(
                `asset-details-page.tooltip.status.${asset.toLowerCase()}`
              )}
              labelText={t("fund-details-page.description.status")}
            />
          }
        >
          <AssetStatus
            status={personalDetails.status as STATUS}
            id={id}
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
              pendingCurrency
            )}
            suffix={` ${pendingCurrency}`}
            displayType="text"
          />
        </StatisticItem>
        {"isReinvest" in personalDetails &&
          personalDetails.isInvested &&
          personalDetails.canInvest &&
          !isOwnAsset && (
            <StatisticItem label={"Reinvest"} hideLabel>
              <ProgramReinvestingContainer
                id={id}
                isReinvesting={personalDetails.isReinvest}
              />
            </StatisticItem>
          )}
        {"isReinvest" in personalDetails &&
          personalDetails.isInvested &&
          personalDetails.canInvest &&
          !isOwnAsset && (
            <StatisticItem label={"Ignore SO"} hideLabel>
              <ProgramAutoJoin
                id={id}
                isAutoJoin={personalDetails.isAutoJoin}
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
          {personalDetails.pendingOutputIsWithdrawAll ? (
            t("withdraw-program.withdrawing-all")
          ) : (
            <NumberFormat
              value={formatCurrencyValue(
                personalDetails.pendingOutput,
                pendingCurrency
              )}
              suffix={` ${pendingCurrency}`}
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
      </DetailsInvestmentFooter>
    </DetailsInvestmentBlock>
  );
};

interface Props {
  isOwnAsset: boolean;
  fees: FeesType;
  updateDescription: () => void;
  asset: ASSET;
  id: string;
  assetCurrency: CurrencyEnum;
  personalDetails: InvestmentType;
}

const Investment = React.memo(Crashable(_Investment));
export default Investment;
