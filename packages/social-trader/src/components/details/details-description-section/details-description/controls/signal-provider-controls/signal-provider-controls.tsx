import { DefaultBlock } from "components/default.block/default.block";
import * as React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const SignalProviderControls: React.FC<Props> = ({ children }) => {
  return (
    <DefaultBlock size={"large"} bordered>
      {children}
    </DefaultBlock>
  );
};

export default SignalProviderControls;
