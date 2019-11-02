import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import React from "react";
import FollowDetailsPageCommon from "shared/components/follows/follow-details/follow-details.page";

import FollowControls from "./components/follow-controls/follow-controls";

const _FollowDetailsPage: React.FC = () => {
  const descriptionSection = {
    Controls: FollowControls,
    WithdrawContainer: ProgramWithdrawContainer
  };

  return <FollowDetailsPageCommon descriptionSection={descriptionSection} />;
};

const FollowDetailsPage = React.memo(_FollowDetailsPage);
export default FollowDetailsPage;
