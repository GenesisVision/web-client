import "shared/components/details/details.scss";

import FundWithdrawalContainer from "modules/fund-withdrawal/fund-withdrawal-container";
import * as React from "react";
import FundDetailsPageCommon from "shared/components/funds/fund-details/fund-details.page";

import InvestmentFundControls from "./components/investment-fund-controls";

const _FundDetailsPage: React.FC = () => {
  const descriptionSection = {
    WithdrawContainer: FundWithdrawalContainer,
    Controls: InvestmentFundControls
  };

  return <FundDetailsPageCommon descriptionSection={descriptionSection} />;
};

const FundDetailsPage = React.memo(_FundDetailsPage);
export default FundDetailsPage;
