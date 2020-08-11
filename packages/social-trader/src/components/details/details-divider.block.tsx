import { mediaBreakpointLandscapePhone } from "components/gv-styles/gv-media";
import { $paddingBig } from "components/gv-styles/gv-sizes";
import { withStyles } from "decorators/withStyles";
import * as React from "react";
import { css } from "styled-components";

interface Props {
  className?: string;
}

const dynamicStyles = css`
  ${mediaBreakpointLandscapePhone(`padding-bottom: ${$paddingBig}px`)}
`;

export const _DetailsDivider: React.FC<Props> = ({ className }) => {
  return <div className={className} />;
};

export const DetailsDivider = withStyles({ dynamicStyles })(_DetailsDivider);
