import "shared/components/details/details.scss";

import FundWithdrawalContainer from "modules/fund-withdrawal/fund-withdrawal-container";
import React from "react";
import FundDetailsPageCommon from "shared/components/funds/fund-details/fund-details.page";

import FundControls from "./components/fund-controls";

const FundDetailsPage: React.FC = () => {
  const descriptionSection = {
    FundWithdrawalContainer: FundWithdrawalContainer,
    FundControls: FundControls
  };

  return <FundDetailsPageCommon descriptionSection={descriptionSection} />;
};
export default FundDetailsPage;
