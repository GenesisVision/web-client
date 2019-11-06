import * as React from "react";
import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "shared/components/details/details-block";

const _SignalProviderControls: React.FC<Props> = ({ children }) => {
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

const SignalProviderControls = React.memo<React.FC<Props>>(
  _SignalProviderControls
);
export default SignalProviderControls;
