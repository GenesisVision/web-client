import * as React from "react";
import { Icon, IIconProps } from "shared/components/icon/icon";
import { ReactComponent as Security } from "shared/media/security.svg";

export const SecurityIcon: React.FC<IIconProps> = props => (
  <Icon type={"security"} {...props}>
    <Security />
  </Icon>
);
