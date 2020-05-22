import Chip from "components/chip/chip";
import * as React from "react";

const Count: React.FC<Props> = React.memo(({ onClick, count }) => (
  <Chip onClick={onClick}>+{count}</Chip>
));

interface Props {
  onClick: (event: any) => void;
  count: number;
}

export default Count;
