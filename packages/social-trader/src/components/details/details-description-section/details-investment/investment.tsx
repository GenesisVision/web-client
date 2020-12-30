import AssetStatus from "components/asset-status/asset-status";
import { DetailsInvestmentBlock } from "components/details/details-description-section/details-investment/blocks/details-investment-block";
import { DetailsInvestmentFooter } from "components/details/details-description-section/details-investment/blocks/details-investment-footer";
import { DetailsInvestmentText } from "components/details/details-description-section/details-investment/blocks/details-investment-text";
import { DetailsInvestmentHeading } from "components/details/details-description-section/details-investment/blocks/details-investment-title";
import { InvestmentItem } from "components/details/details-description-section/details-investment/investment-item";
import { ProfitabilityValuePercent } from "components/profitability/profitability-value-percent";
import { Row } from "components/row/row";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { ASSET, STATUS } from "constants/constants";
import { useAccountCurrency } from "hooks/account-currency.hook";
import ProgramAutoJoin from "modules/program-auto-join/program-auto-join";
import ProgramReinvestingContainer from "modules/program-reinvesting/components/program-reinvesting-container";
import WithdrawButton from "modules/withdraw/withdraw.button";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum, FeesType } from "utils/types";

import { InvestmentType } from "./details-investment.helpers";

interface Props {
  isExchange?: boolean;
  isProcessingRealTime?: boolean;
  hasTradingSchedule?: boolean;
  investmentMessage?: string;
  withdrawMessage?: string;
  isOwnAsset: boolean;
  fees: FeesType;
  updateDescription: VoidFunction;
  asset: ASSET;
  id: string;
  assetCurrency: CurrencyEnum;
  personalDetails: InvestmentType;
}

const _Investment: React.FC<Props> = ({
  isExchange,
  isProcessingRealTime,
  investmentMessage,
  hasTradingSchedule,
  withdrawMessage,
  isOwnAsset,
  fees,
  updateDescription,
  id,
  assetCurrency,
  asset,
  personalDetails
}) => {
  const {
    successFeePersonal,
    exitFee,
    exitFeePersonal,
    managementFeePersonal
  } = fees;
  const accountCurrency = useAccountCurrency();
  const [t] = useTranslation();
  const profitValue = "profit" in personalDetails ? personalDetails.profit : 0;
  const profitPercentValue =
    "profitPercent" in personalDetails ? personalDetails.profitPercent : 0;

  const currency = asset === ASSET.FUND ? accountCurrency : assetCurrency;
  const pendingCurrency =
    asset === ASSET.FUND ? personalDetails.pendingInOutCurrency : assetCurrency;

  const hasPendingInput =
    personalDetails.pendingInput !== undefined &&
    personalDetails.pendingInput !== 0;
  const hasPendingOutput =
    personalDetails.pendingOutput !== undefined &&
    personalDetails.pendingOutput !== 0;
  const message =
    hasPendingInput || hasPendingOutput ? withdrawMessage : investmentMessage;

  return (
    <DetailsInvestmentBlock>
      <DetailsInvestmentHeading>
        {t("asset-details:description.investment-details")}
      </DetailsInvestmentHeading>
      <Row>
        <StatisticItemList wrap={asset !== ASSET.FUND}>
          <InvestmentItem label={t("asset-details:description.value")}>
            <NumberFormat
              value={formatCurrencyValue(personalDetails.value, currency)}
              suffix={` ${currency}`}
              displayType="text"
            />
          </InvestmentItem>
          {asset === ASSET.PROGRAM && !isExchange && (
            <InvestmentItem
              label={
                <TooltipLabel
                  tooltipContent={t("program-details-page:tooltip.profit")}
                  labelText={t("asset-details:description.profit")}
                />
              }
            >
              <ProfitabilityValuePercent
                currency={assetCurrency}
                value={profitValue}
                percent={profitPercentValue}
              />
            </InvestmentItem>
          )}
          {personalDetails.isInvested &&
            successFeePersonal !== undefined &&
            successFeePersonal !== null && (
              <InvestmentItem label={t("asset-details:description.successFee")}>
                <NumberFormat
                  value={successFeePersonal}
                  suffix={` %`}
                  allowNegative={false}
                  displayType="text"
                />
              </InvestmentItem>
            )}
          {!isOwnAsset &&
            managementFeePersonal !== undefined &&
            managementFeePersonal !== null && (
              <InvestmentItem
                label={t("asset-details:description.personal-management-fee")}
              >
                <NumberFormat
                  value={managementFeePersonal}
                  suffix={` % (annual)`}
                  allowNegative={false}
                  displayType="text"
                />
              </InvestmentItem>
            )}
          {exitFeePersonal !== null &&
            exitFeePersonal !== undefined &&
            exitFee !== exitFeePersonal && (
              <InvestmentItem label={t("asset-details:description.exitFee")}>
                <NumberFormat
                  value={exitFeePersonal}
                  suffix={` %`}
                  allowNegative={false}
                  displayType="text"
                />
              </InvestmentItem>
            )}
          <InvestmentItem
            label={
              <TooltipLabel
                tooltipContent={t(
                  `asset-details:tooltip.status.${asset.toLowerCase()}`
                )}
                labelText={t("asset-details:description.status")}
              />
            }
          >
            <AssetStatus
              status={personalDetails.status as STATUS}
              id={id}
              onCancel={updateDescription}
            />
          </InvestmentItem>
          {hasPendingInput && (
            <InvestmentItem
              label={t("asset-details:description.pending-input")}
            >
              <NumberFormat
                value={formatCurrencyValue(
                  personalDetails.pendingInput,
                  pendingCurrency
                )}
                suffix={` ${pendingCurrency}`}
                displayType="text"
              />
            </InvestmentItem>
          )}
          {!isExchange &&
            "isReinvest" in personalDetails &&
            personalDetails.isInvested &&
            personalDetails.canInvest &&
            !isOwnAsset && (
              <InvestmentItem label={<>&nbsp;</>}>
                <ProgramReinvestingContainer
                  id={id}
                  isReinvesting={personalDetails.isReinvest}
                />
              </InvestmentItem>
            )}
          {!isExchange &&
            "isReinvest" in personalDetails &&
            personalDetails.isInvested &&
            personalDetails.canInvest &&
            !isOwnAsset && (
              <InvestmentItem label={<>&nbsp;</>}>
                <ProgramAutoJoin
                  id={id}
                  isAutoJoin={personalDetails.isAutoJoin}
                />
              </InvestmentItem>
            )}
          {hasPendingOutput && (
            <InvestmentItem
              label={t("asset-details:description.pending-output")}
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
            </InvestmentItem>
          )}
          {hasTradingSchedule &&
            (personalDetails.status === "Pending" ||
              hasPendingInput ||
              hasPendingOutput) && (
              <DetailsInvestmentText>{message}</DetailsInvestmentText>
            )}
        </StatisticItemList>
      </Row>
      <Row>
        <DetailsInvestmentFooter>
          <WithdrawButton
            GM={isExchange}
            isProcessingRealTime={isProcessingRealTime}
            infoMessage={withdrawMessage}
            size={"xlarge"}
            disabled={!personalDetails.canWithdraw}
            onApply={updateDescription}
            type={asset}
            id={id}
            currency={assetCurrency}
          />
        </DetailsInvestmentFooter>
      </Row>
    </DetailsInvestmentBlock>
  );
};

const Investment = React.memo(_Investment);
export default Investment;
