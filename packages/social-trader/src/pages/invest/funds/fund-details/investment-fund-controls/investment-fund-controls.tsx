import { DefaultBlock } from "components/default.block/default.block";
import { DetailsStatisticContainer } from "components/details/details-description-section/details-description/details-structure-blocks";
import { Row } from "components/row/row";
import { RowItem } from "components/row-item/row-item";
import { ASSET } from "constants/constants";
import { FundDetailsFull } from "gv-api-web";
import BSCInvestingButton from "modules/bsc-investing/bsc-investing.button";
import DepositButton from "modules/deposit/deposit.button";
import InvestmentFundInfo from "pages/invest/funds/fund-details/fund-details-description/investment-fund-info";
import * as React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { platformDataSelector } from "reducers/platform-reducer";

const _InvestmentFundControls: React.FC<Props> = ({
  hasTradingSchedule,
  infoMessage,
  fundDescription,
  onApply,
  renderAssetPopup
}) => {
  const isOwnProgram = fundDescription.publicInfo.isOwnAsset;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const platformData = useSelector(platformDataSelector);
  const canInvest = isAuthenticated
    ? !!fundDescription.personalDetails &&
      fundDescription.personalDetails.canInvest
    : true;
  return (
    <DefaultBlock size={"large"} bordered>
      <InvestmentFundInfo fundDescription={fundDescription} />
      <Row>
        <DetailsStatisticContainer>
          <RowItem>
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
          {platformData?.assetInfo.anonymousInfo.isInvestingBscEnabled && (
            <RowItem>
              <BSCInvestingButton
                currency={"BNB"}
                assetIndex={fundDescription.publicInfo.index}
              />
            </RowItem>
          )}
          {platformData?.assetInfo.anonymousInfo.isInvestingXDaiEnabled && (
            <RowItem>
              <BSCInvestingButton
                currency={"xDai"}
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
