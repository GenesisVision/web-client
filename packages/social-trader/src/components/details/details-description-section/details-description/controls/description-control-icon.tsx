import { $labelColor } from "components/gv-styles/gv-colors/gv-colors";
import { mediaBreakpointLandscapePhone } from "components/gv-styles/gv-media";
import React from "react";
import styled from "styled-components";

export const DescriptionControlIcon = styled.div`
  width: 20px;
  height: 20px;
  ${mediaBreakpointLandscapePhone(`
    max-width: 17px;
    max-height: 17px;
  `)}
  svg [stroke] {
    transition: stroke 300ms ease;
    stroke: ${$labelColor};
  }
`;
