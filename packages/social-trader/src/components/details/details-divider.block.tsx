import * as React from "react";
import styled from "styled-components";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { $paddingBig, $paddingXsmall } from "utils/style/sizes";

export const DetailsDivider = styled.div`
  padding-bottom: ${$paddingXsmall}px;
  ${mediaBreakpointLandscapePhone(`padding-bottom: ${$paddingBig}px`)};
`;
