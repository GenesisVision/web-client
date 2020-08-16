import { $primaryColor } from "components/gv-styles/gv-colors/gv-colors";
import { Icon, IIconProps } from "components/icon/icon";
import { withStyles } from "decorators/withStyles";
import * as React from "react";
import { css } from "styled-components";

const _MenuIcon: React.FC<IIconProps> = props => (
  <Icon {...props}>
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.6">
        <path d="M0 1.64697H14.0011" stroke="white" strokeWidth="1.5" />
        <path d="M0 7.41162H2.67647H14" stroke="white" strokeWidth="1.5" />
        <path d="M0 13.1763H14" stroke="white" strokeWidth="1.5" />
      </g>
    </svg>
  </Icon>
);

export const MenuIcon = withStyles({
  dynamicStyles: css`
    height: 15px;
    width: 16px;
  `
})(_MenuIcon);
