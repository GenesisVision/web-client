import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "shared/components/details/details-block";
import SignalProgramInfo from "shared/components/programs/program-details/program-details-description/signal-program-info";
import { ROLE } from "shared/constants/constants";
import useRole from "shared/hooks/use-role.hook";

import SignalProviderButtons from "./signal-provider-buttons";

const _SignalProviderControls: React.FC<Props> = ({ programDescription }) => {
  const role = useRole();
  return (
    <DetailsBlock
      type={DETAILS_BLOCK_TYPE.BORDERED}
      className="details-description__control-elements-block"
    >
      <SignalProgramInfo programDescription={programDescription} />
      <SignalProviderButtons
        condition={
          role === ROLE.INVESTOR && !!programDescription.personalProgramDetails
        }
        personalDetails={programDescription.personalProgramDetails}
        id={programDescription.id}
        title={programDescription.title}
        currency={programDescription.currency}
      />
    </DetailsBlock>
  );
};

interface Props {
  programDescription: ProgramDetailsFull;
}

const SignalProviderControls = React.memo(_SignalProviderControls);
export default SignalProviderControls;
