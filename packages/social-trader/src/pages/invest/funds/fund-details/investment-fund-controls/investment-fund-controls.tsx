import { DefaultBlock } from "components/default.block/default.block";
import { DetailsStatisticContainer } from "components/details/details-description-section/details-description/details-structure-blocks";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { ASSET } from "constants/constants";
import { FundDetailsFull } from "gv-api-web";
import DepositButton from "modules/deposit/deposit.button";
import MetamaskInvestingButton from "modules/web3/investing/metamask-investing.button";
import InvestmentFundInfo from "pages/invest/funds/fund-details/fund-details-description/investment-fund-info";
import * as React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import {
  isInvestingBscEnabledSelector,
  isInvestingXDaiEnabledSelector
} from "reducers/platform-reducer";

const _InvestmentFundControls: React.FC<Props> = ({
  hasTradingSchedule,
  infoMessage,
  fundDescription,
  onApply,
  renderAssetPopup
}) => {
  const isOwnProgram = fundDescription.publicInfo.isOwnAsset;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isInvestingBscEnabled = useSelector(isInvestingBscEnabledSelector);
  const isInvestingXDaiEnabled = useSelector(isInvestingXDaiEnabledSelector);
  const canInvest = isAuthenticated
    ? !!fundDescription.personalDetails &&
      fundDescription.personalDetails.canInvest
    : true;
  return (
    <DefaultBlock size={"large"} bordered>
      <InvestmentFundInfo fundDescription={fundDescription} />
      <Row>
        <DetailsStatisticContainer isMobileWrap>
          <RowItem bottomOffset>
            <DepositButton
              renderAssetPopup={renderAssetPopup}
              infoMessage={hasTradingSchedule ? infoMessage : undefined}
              disabled={!canInvest}
              title={fundDescription.publicInfo.title}
              onApply={onApply}
              size={"xlarge"}
              ownAsset={isOwnProgram}
              entryFee={fundDescription.entryFeeCurrent}
              type={ASSET.FUND}
              id={fundDescription.id}
            />
          </RowItem>
          {isInvestingBscEnabled && canInvest && (
            <RowItem bottomOffset>
              <MetamaskInvestingButton
                currency={"BNB"}
                assetIndex={fundDescription.publicInfo.index}
              />
            </RowItem>
          )}
          {isInvestingXDaiEnabled && canInvest && (
            <RowItem bottomOffset>
              <MetamaskInvestingButton
                currency={"DAI"}
                assetIndex={fundDescription.publicInfo.index}
              />
            </RowItem>
          )}
        </DetailsStatisticContainer>
      </Row>
    </DefaultBlock>
  );
};

interface Props {
  renderAssetPopup: (popupTop: JSX.Element, form: JSX.Element) => JSX.Element;
  hasTradingSchedule?: boolean;
  infoMessage?: string;
  fundDescription: FundDetailsFull;
  onApply: () => any;
}

const InvestmentFundControls = React.memo(_InvestmentFundControls);
export default InvestmentFundControls;
