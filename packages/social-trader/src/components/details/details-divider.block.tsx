import { mediaBreakpointLandscapePhone } from "components/gv-styles/gv-media";
import { $paddingBig } from "components/gv-styles/gv-sizes";
import * as React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  ${mediaBreakpointLandscapePhone(`padding-bottom: ${$paddingBig}px`)}
`;

export const DetailsDivider: React.FC = () => {
  return <StyledDiv />;
};
