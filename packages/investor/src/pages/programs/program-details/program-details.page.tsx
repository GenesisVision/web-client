import ProgramReinvestingContainer from "modules/program-reinvesting/components/program-reinvesting-container";
import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw.container";
import * as React from "react";
import ProgramDetailsPageCommon from "shared/components/programs/program-details/program-details.page";

import ProgramControls from "./components/program-controls";

const _ProgramDetailsPage: React.FC = () => {
  const descriptionSection = {
    Controls: ProgramControls,
    WithdrawContainer: ProgramWithdrawContainer,
    ReinvestingWidget: ProgramReinvestingContainer
  };

  return <ProgramDetailsPageCommon descriptionSection={descriptionSection} />;
};

const ProgramDetailsPage = React.memo(_ProgramDetailsPage);

export default ProgramDetailsPage;
