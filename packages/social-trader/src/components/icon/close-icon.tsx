import { CloseIconSVGSource } from "components/icon/close-icon-svg-source";
import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const CloseIcon: React.FC<IIconProps> = props => (
  <Icon type="close" {...props}>
    <CloseIconSVGSource />
  </Icon>
);
