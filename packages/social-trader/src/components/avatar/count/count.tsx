import Chip from "components/chip/chip";
import * as React from "react";
import { Clickable } from "utils/types";

const Count: React.FC<Props> = React.memo(({ onClick, count }) => (
  <Chip onClick={onClick}>+{count}</Chip>
));

interface Props extends Clickable {
  count: number;
}

export default Count;
