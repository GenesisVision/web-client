import { ProgramDetailsFullOld } from "gv-api-web";
import * as React from "react";
import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "shared/components/details/details-block";
import SignalProgramInfo from "shared/components/programs/program-details/program-details-description/signal-program-info";

const _SignalProviderControls: React.FC<Props> = ({
  programDescription,
  children
}) => {
  return (
    <DetailsBlock
      type={DETAILS_BLOCK_TYPE.BORDERED}
      className="details-description__control-elements-block"
    >
      <SignalProgramInfo programDescription={programDescription} />
      {children}
    </DetailsBlock>
  );
};

interface Props {
  programDescription: ProgramDetailsFullOld;
}

const SignalProviderControls = React.memo<React.FC<Props>>(
  _SignalProviderControls
);
export default SignalProviderControls;
