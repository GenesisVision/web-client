import { mediaBreakpointLandscapePhone } from "components/gv-styles/gv-media";
import { $paddingBig, $paddingXsmall } from "components/gv-styles/gv-sizes";
import * as React from "react";
import styled from "styled-components";

export const DetailsDivider = styled.div`
  padding-bottom: ${$paddingXsmall}px;
  ${mediaBreakpointLandscapePhone(`padding-bottom: ${$paddingBig}px`)};
`;
