import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import { GV_BTN_SIZE } from "components/gv-button";
import { FundDetailsFull } from "gv-api-web";
import DepositButton from "modules/deposit/deposit.button";
import InvestmentFundInfo from "pages/funds/fund-details/fund-details-description/investment-fund-info";
import * as React from "react";
import { ASSET } from "shared/constants/constants";

const _InvestmentFundControls: React.FC<Props> = ({ fundDescription }) => {
  const { personalDetails } = fundDescription;
  const isOwnProgram = personalDetails && personalDetails.isOwnAsset;
  return (
    <DetailsBlock
      type={DETAILS_BLOCK_TYPE.BORDERED}
      className="details-description__control-elements-block"
    >
      <InvestmentFundInfo fundDescription={fundDescription} />
      <div className="asset-details-description__statistic-container asset-details-description__statistic-container--btn">
        <DepositButton
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
}

const InvestmentFundControls = React.memo(_InvestmentFundControls);
export default InvestmentFundControls;
