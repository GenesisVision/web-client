import * as React from "react";
import { Icon, IIconProps } from "shared/components/icon/icon";

import { ReactComponent as Fund } from "./funds.svg";

export const FundsIcon: React.FC<IIconProps> = props => (
  <Icon type={"funds"} {...props}>
    <Fund />
  </Icon>
);
