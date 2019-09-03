import ProgramWithdrawContainer from "modules/program-withdraw/program-withdraw-container";
import React from "react";
import ProgramDetailsPageCommon from "shared/components/programs/program-details/program-details.page";

import ProgramControls from "./components/program-controls/program-controls";

const _ProgramDetailsPage: React.FC = () => {
  const descriptionSection = {
    ProgramControls: ProgramControls,
    ProgramWithdrawContainer: ProgramWithdrawContainer
  };

  return <ProgramDetailsPageCommon descriptionSection={descriptionSection} />;
};

const ProgramDetailsPage = React.memo(_ProgramDetailsPage);
export default ProgramDetailsPage;
