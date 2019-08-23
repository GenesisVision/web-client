import * as React from "react";
import { IIconProps, Icon } from "shared/components/icon/icon";
import { ReactComponent as Security } from "shared/media/security.svg";

export const SecurityIcon: React.FC<IIconProps> = props => (
  <Icon type={"security"} {...props}>
    <Security />
  </Icon>
);
