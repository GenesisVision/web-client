import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import * as React from "react";

const SignalProviderControls: React.FC<Props> = ({ children }) => {
  return (
    <DetailsBlock
      type={DETAILS_BLOCK_TYPE.BORDERED}
      className="details-description__control-elements-block"
    >
      {children}
    </DetailsBlock>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default SignalProviderControls;
