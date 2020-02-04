import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import { GV_BTN_SIZE } from "components/gv-button";
import { ASSET } from "constants/constants";
import { FundDetailsFull } from "gv-api-web";
import DepositButton from "modules/deposit/deposit.button";
import InvestmentFundInfo from "pages/funds/fund-details/fund-details-description/investment-fund-info";
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
    <DetailsBlock
      type={DETAILS_BLOCK_TYPE.BORDERED}
      className="details-description__control-elements-block"
    >
      <InvestmentFundInfo fundDescription={fundDescription} />
      <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
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
      </div>
    </DetailsBlock>
  );
};

interface Props {
  fundDescription: FundDetailsFull;
  onApply: () => any;
}

const InvestmentFundControls = React.memo(_InvestmentFundControls);
export default InvestmentFundControls;
