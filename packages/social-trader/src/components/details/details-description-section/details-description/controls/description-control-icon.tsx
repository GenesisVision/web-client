import React from "react";
import styled from "styled-components";
import { $labelColor } from "utils/style/colors";
import { mediaBreakpointLandscapePhone } from "utils/style/media";

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
