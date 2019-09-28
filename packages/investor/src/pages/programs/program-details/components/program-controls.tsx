import React from "react";
import SignalProviderControls from "shared/components/details/details-description-section/details-description/controls/signal-provider-controls/signal-provider-controls";
import { IProgramControlsProps } from "shared/components/programs/program-details/program-details.types";
import { ROLE } from "shared/constants/constants";
import useRole from "shared/hooks/use-role.hook";

import InvestmentProgramControls from "./investment-program-controls";
import SignalProviderButtons from "./signal-provider-buttons";

const _ProgramControls: React.FC<IProgramControlsProps> = ({
  programDescription
}) => {
  const role = useRole();
  return (
    <div className="asset-details-description__controls">
      <InvestmentProgramControls programDescription={programDescription} />
      {programDescription.isSignalProgram && (
        <SignalProviderControls programDescription={programDescription}>
          <SignalProviderButtons
            condition={
              role === ROLE.INVESTOR &&
              !!programDescription.personalProgramDetails
            }
            personalDetails={programDescription.personalProgramDetails}
            id={programDescription.id}
            title={programDescription.title}
            currency={programDescription.currency}
          />
        </SignalProviderControls>
      )}
    </div>
  );
};

const ProgramControls = React.memo(_ProgramControls);
export default ProgramControls;
