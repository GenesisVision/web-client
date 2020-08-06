import Chip from "components/chip/chip";
import * as React from "react";
import { Clickable } from "utils/types";

interface Props extends Clickable {
  count: number;
}

const Count: React.FC<Props> = React.memo(({ onClick, count }) => (
  <Chip onClick={onClick}>+{count}</Chip>
));

export default Count;
