import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import { DetailsStatisticContainer } from "components/details/details-description-section/details-description/details-structure-blocks";
import { GV_BTN_SIZE } from "components/gv-button";
import { ASSET } from "constants/constants";
import { FundDetailsFull } from "gv-api-web";
import DepositButton from "modules/deposit/deposit.button";
import InvestmentFundInfo from "pages/invest/funds/fund-details/fund-details-description/investment-fund-info";
import * as React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

const _InvestmentFundControls: React.FC<Props> = ({
  fundDescription,
  onApply
}) => {
  const isOwnProgram = fundDescription.publicInfo.isOwnAsset;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const canInvest = isAuthenticated
    ? !!fundDescription.personalDetails &&
      fundDescription.personalDetails.canInvest
    : true;
  return (
    <DetailsBlock type={DETAILS_BLOCK_TYPE.BORDERED}>
      <InvestmentFundInfo fundDescription={fundDescription} />
      <DetailsStatisticContainer>
        <DepositButton
          disabled={!canInvest}
          title={fundDescription.publicInfo.title}
          onApply={onApply}
          size={GV_BTN_SIZE.BIG}
          ownAsset={isOwnProgram}
          entryFee={fundDescription.entryFeeCurrent}
          type={ASSET.FUND}
          id={fundDescription.id}
        />
      </DetailsStatisticContainer>
    </DetailsBlock>
  );
};

interface Props {
  fundDescription: FundDetailsFull;
  onApply: () => any;
}

const InvestmentFundControls = React.memo(_InvestmentFundControls);
export default InvestmentFundControls;
