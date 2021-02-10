import { DefaultBlock } from "components/default.block/default.block";
import { DetailsStatisticContainer } from "components/details/details-description-section/details-description/details-structure-blocks";
import { InvestmentItem } from "components/details/details-description-section/details-investment/investment-item";
import InvestmentProgramInfo from "components/details/details-description-section/investment-program-info";
import { Row } from "components/row/row";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { ASSET } from "constants/constants";
import {
  AssetPublicDetails,
  BrokerDetails,
  LevelsParamsInfo,
  ProgramDetailsFull,
  ProgramFollowDetailsFullTradingAccountDetails
} from "gv-api-web";
import DepositButton from "modules/deposit/deposit.button";
import NotifyButton from "modules/notity-button/notify-button";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { formatValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

interface Props {
  ownerUrl: string;
  programOwner: string;
  isExchange?: boolean;
  currency: CurrencyEnum;
  id: string;
  programDetails: ProgramDetailsFull;
  publicInfo: AssetPublicDetails;
  brokerDetails: BrokerDetails;
  tradingAccountInfo: ProgramFollowDetailsFullTradingAccountDetails;
  onApply: VoidFunction;
  isOwnProgram: boolean;
  levelsParameters: LevelsParamsInfo;
  AssetDetailsExtraBlock: React.ComponentType<any>;
}

const _InvestmentProgramControls: React.FC<Props> = props => {
  const [t] = useTranslation();
  const {
    AssetDetailsExtraBlock,
    isExchange,
    currency,
    onApply,
    isOwnProgram,
    id,
    programDetails,
    publicInfo,
    brokerDetails,
    tradingAccountInfo,
    levelsParameters,
    programOwner,
    ownerUrl
  } = props;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const canInvest = isAuthenticated
    ? !!programDetails.personalDetails &&
    programDetails.personalDetails.canInvest
    : true;

  return (
    <DefaultBlock size={"large"} bordered>
      <InvestmentProgramInfo
        isExchange={isExchange}
        id={id}
        currency={tradingAccountInfo.currency}
        title={publicInfo.title}
        programDetails={programDetails}
        isOwnProgram={isOwnProgram}
        levelsParameters={levelsParameters}
      />
      <Row>
        <DetailsStatisticContainer>
          {programDetails.availableInvestmentBase === 0 &&
            isAuthenticated &&
            !isOwnProgram ? (
              <NotifyButton
                broker={brokerDetails.type}
                canInvest={programDetails.personalDetails.canInvest}
                currency={currency}
                assetId={id}
              />
            ) : (
              <DepositButton
                renderFees={
                  <>
                    <InvestmentItem
                      label={
                        <TooltipLabel
                          tooltipContent={t(
                            "asset-details:description.tooltips.currency"
                          )}
                          labelText={t("asset-details:description.currency")}
                        />
                      }
                    >
                      {currency}
                    </InvestmentItem>
                    <InvestmentItem
                      label={
                        <TooltipLabel
                          tooltipContent={t(
                            "program-details-page:tooltip.management-fee"
                          )}
                          labelText={t(
                            "asset-details:description.management-fee"
                          )}
                        />
                      }
                    >
                      <NumberFormat
                        value={formatValue(programDetails.managementFeeCurrent)}
                        displayType="text"
                        suffix=" %"
                      />
                    </InvestmentItem>
                    <InvestmentItem
                      label={
                        <TooltipLabel
                          tooltipContent={t(
                            "program-details-page:tooltip.success-fee"
                          )}
                          labelText={t("asset-details:description.successFee")}
                        />
                      }
                    >
                      <NumberFormat
                        value={formatValue(programDetails.successFeeCurrent)}
                        displayType="text"
                        suffix=" %"
                      />
                    </InvestmentItem>
                    <InvestmentItem
                      label={
                        <TooltipLabel
                          tooltipContent={t(
                            "program-details-page:tooltip.stop-out-level"
                          )}
                          labelText={t(
                            "asset-details:description.stop-out-level"
                          )}
                        />
                      }
                    >
                      <NumberFormat
                        value={formatValue(programDetails.stopOutLevelCurrent)}
                        displayType="text"
                        suffix=" %"
                      />
                    </InvestmentItem>
                  </>
                }
                assetColor={publicInfo.color}
                totalAvailableInvestment={programDetails.totalAvailableInvestment}
                assetLevelProgress={programDetails.levelProgress}
                assetLevel={programDetails.level}
                assetLogo={publicInfo.logoUrl}
                AssetDetailsExtraBlock={AssetDetailsExtraBlock}
                assetOwner={programOwner}
                ownerUrl={ownerUrl}
                isProcessingRealTime={
                  programDetails.dailyPeriodDetails?.isProcessingRealTime
                }
                disabled={!canInvest}
                title={publicInfo.title}
                onApply={onApply}
                size={"xlarge"}
                ownAsset={isOwnProgram}
                entryFee={programDetails.managementFeeCurrent}
                availableToInvest={programDetails.availableInvestmentBase}
                broker={brokerDetails.type}
                brokerName={brokerDetails.name}
                brokerLogo={brokerDetails.logoUrl}
                type={ASSET.PROGRAM}
                id={id}
                currency={tradingAccountInfo.currency}
              />
            )}
        </DetailsStatisticContainer>
      </Row>
    </DefaultBlock>
  );
};

const InvestmentProgramControls = React.memo(_InvestmentProgramControls);
export default InvestmentProgramControls;
