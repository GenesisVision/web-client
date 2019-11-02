import React from "react";
import { IProgramControlsProps } from "shared/components/programs/program-details/program-details.types";

import InvestmentProgramControls from "./investment-program-controls";

const _ProgramControls: React.FC<IProgramControlsProps> = ({
  programDescription
}) => {
  return <InvestmentProgramControls programDescription={programDescription} />;
};

const ProgramControls = React.memo<React.FC<IProgramControlsProps>>(
  _ProgramControls
);
export default ProgramControls;
