import { DefaultBlock } from "components/default.block/default.block";
import { DetailsStatisticContainer } from "components/details/details-description-section/details-description/details-structure-blocks";
import InvestmentProgramInfo from "components/details/details-description-section/investment-program-info";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { ASSET } from "constants/constants";
import {
  AssetPublicDetails,
  BrokerDetails,
  LevelsParamsInfo,
  ProgramDetailsFull,
  ProgramFollowDetailsFullTradingAccountDetails
} from "gv-api-web";
import BSCInvestingButton from "modules/bsc-investing/bsc-investing.button";
import DepositButton from "modules/deposit/deposit.button";
import NotifyButton from "modules/notity-button/notify-button";
import * as React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { CurrencyEnum } from "utils/types";

interface Props {
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
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
}

const _InvestmentProgramControls: React.FC<Props> = ({
  renderAssetPopup,
  isExchange,
  currency,
  onApply,
  isOwnProgram,
  id,
  programDetails,
  publicInfo,
  brokerDetails,
  tradingAccountInfo,
  levelsParameters
}) => {
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
          <RowItem>
            {programDetails.availableInvestmentBase === 0 &&
            isAuthenticated &&
            !isOwnProgram ? (
              <NotifyButton
                hasNotifications={
                  programDetails.personalDetails.hasNotifications
                }
                broker={brokerDetails.type}
                canInvest={programDetails.personalDetails.canInvest}
                currency={currency}
                assetId={id}
              />
            ) : (
              <DepositButton
                renderAssetPopup={renderAssetPopup}
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
                type={ASSET.PROGRAM}
                id={id}
                currency={tradingAccountInfo.currency}
              />
            )}
          </RowItem>
          <BSCInvestingButton assetId={id} />
        </DetailsStatisticContainer>
      </Row>
    </DefaultBlock>
  );
};

const InvestmentProgramControls = React.memo(_InvestmentProgramControls);
export default InvestmentProgramControls;
