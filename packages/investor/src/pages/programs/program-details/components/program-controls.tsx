import React from "react";
import SignalProviderControls from "shared/components/details/details-description-section/details-description/controls/signal-provider-controls/signal-provider-controls";
import { IProgramControlsProps } from "shared/components/programs/program-details/program-details.types";

import InvestmentProgramControls from "./investment-program-controls";
import SignalProviderButtons from "./signal-provider-buttons";

const _ProgramControls: React.FC<IProgramControlsProps> = ({
  programDescription
}) => {
  return (
    <>
      <InvestmentProgramControls programDescription={programDescription} />
      {programDescription.isSignalProgram && (
        <SignalProviderControls programDescription={programDescription}>
          <SignalProviderButtons
            condition={!!programDescription.personalProgramDetails}
            personalDetails={programDescription.personalProgramDetails}
            id={programDescription.id}
            title={programDescription.title}
            currency={programDescription.currency}
          />
        </SignalProviderControls>
      )}
    </>
  );
};

const ProgramControls = React.memo<React.FC<IProgramControlsProps>>(
  _ProgramControls
);
export default ProgramControls;
