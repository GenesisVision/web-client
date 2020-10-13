import { DefaultBlock } from "components/default.block/default.block";
import styled from "styled-components";
import { $textLightColor } from "utils/style/colors";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import {
  $detailsStatisticSectionWidth,
  $paddingXsmall
} from "utils/style/sizes";

export const StyledDetailsStatisticsBlock = styled(DefaultBlock)`
  box-sizing: border-box;
  width: 100%;
  color: ${$textLightColor};

  margin-bottom: ${$paddingXsmall}px;
  &:not(:last-child) {
    ${mediaBreakpointLandscapePhone(`margin-right:${$paddingXsmall}px;`)}
  }
  ${mediaBreakpointLandscapePhone(
    `max-width: ${$detailsStatisticSectionWidth}px;`
  )}
`;
