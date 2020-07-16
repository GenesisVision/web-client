import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import { DetailsStatisticContainer } from "components/details/details-description-section/details-description/details-structure-blocks";
import { Row } from "components/row/row";
import { ASSET } from "constants/constants";
import { FundDetailsFull } from "gv-api-web";
import DepositButton from "modules/deposit/deposit.button";
import InvestmentFundInfo from "pages/invest/funds/fund-details/fund-details-description/investment-fund-info";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

const _InvestmentFundControls: React.FC<Props> = ({
  fundDescription,
  onApply
}) => {
  const [t] = useTranslation();
  const isOwnProgram = fundDescription.publicInfo.isOwnAsset;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const canInvest = isAuthenticated
    ? !!fundDescription.personalDetails &&
      fundDescription.personalDetails.canInvest
    : true;
  const hasNasdaqAssets = false;
  // fundDescription.assetsStructure.filter(
  //   ({ provider }) => provider === "Nasdaq"
  // ).length > 0;
  const nasdaqMessage = `${t(
    "deposit-asset.fund.nasdaq"
  )} \n ${"Monday - Friday, 1:30 p.m. - 8:00 p.m. (UTC)"}`;
  return (
    <DetailsBlock type={DETAILS_BLOCK_TYPE.BORDERED}>
      <InvestmentFundInfo fundDescription={fundDescription} />
      <Row>
        <DetailsStatisticContainer>
          <DepositButton
            infoMessage={hasNasdaqAssets ? nasdaqMessage : undefined}
            disabled={!canInvest}
            title={fundDescription.publicInfo.title}
            onApply={onApply}
            size={"xlarge"}
            ownAsset={isOwnProgram}
            entryFee={fundDescription.entryFeeCurrent}
            type={ASSET.FUND}
            id={fundDescription.id}
          />
        </DetailsStatisticContainer>
      </Row>
    </DetailsBlock>
  );
};

interface Props {
  fundDescription: FundDetailsFull;
  onApply: () => any;
}

const InvestmentFundControls = React.memo(_InvestmentFundControls);
export default InvestmentFundControls;
