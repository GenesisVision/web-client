import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import * as React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const SignalProviderControls: React.FC<Props> = ({ children }) => {
  return (
    <DetailsBlock type={DETAILS_BLOCK_TYPE.BORDERED}>{children}</DetailsBlock>
  );
};

export default SignalProviderControls;
