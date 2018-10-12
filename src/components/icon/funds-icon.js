import { Icon } from "components/icon/icon";
import React from "react";

import { ReactComponent as Fund } from "./funds.svg";

export const FundsIcon = props => {
  return (
    <Icon type={"funds"} {...props}>
      <Fund />
    </Icon>
  );
};
