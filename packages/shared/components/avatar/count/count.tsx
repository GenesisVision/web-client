import * as React from "react";
import Chip from "shared/components/chip/chip";

const Count: React.FC<Props> = React.memo(({ onClick, count }) => (
  <Chip className={"traders-count"} onClick={onClick}>
    +{count}
  </Chip>
));

interface Props {
  onClick: (event: any) => void;
  count: number;
}

export default Count;
