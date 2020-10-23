import { Center } from "components/center/center";
import Dialog from "components/dialog/dialog";
import Link from "components/link/link";
import styled from "styled-components";
import { $popoverBackground, $primaryColor } from "utils/style/colors";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import {
  adaptiveMargin,
  horizontalPaddings,
  verticalPaddings
} from "utils/style/mixins";
import {
  $fontSizeH4,
  $fontSizeSmall,
  $paddingSmall,
  $paddingXsmall,
  $paddingXxlarge,
  $paddingXxsmall
} from "utils/style/sizes";

export const LevelCalculatorPopupHeader = styled(Center)`
  justify-content: space-between;
`;

export const LevelCalculatorPopupHeading = styled.h2`
  color: ${$primaryColor};
  font-weight: 600;
`;

export const LevelCalculatorPopupCloseButton = styled.div`
  width: 10px;
`;

export const LevelCalculatorPopupProgramName = styled.div`
  ${adaptiveMargin("top", $paddingSmall - $paddingXxsmall)};
  ${adaptiveMargin("bottom", $paddingXxlarge / 2)};
`;

export const LevelCalculatorPopupProgramLabel = styled.div`
  opacity: 0.5;
  letter-spacing: 0.4px;
  ${adaptiveMargin("bottom", $paddingXxsmall / 2)};
  font-size: ${$fontSizeSmall}px;
`;

export const LevelCalculatorPopupProgramTitle = styled.div`
  font-size: ${$fontSizeH4}px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

export const LevelCalculatorPopupControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  ${adaptiveMargin("bottom", $paddingXsmall)};
`;

export const LevelCalculatorPopupKYCDisclaimer = styled.div`
  ${verticalPaddings($paddingXsmall)};
`;

export const LevelCalculatorPopupVerifyButton = styled(Link)`
  display: flex;
  justify-content: flex-end;
`;

export const LevelCalculatorPopupDialog = styled(Dialog)`
  background-color: ${$popoverBackground};
  ${verticalPaddings($paddingSmall)};
  ${horizontalPaddings($paddingSmall)};
  ${mediaBreakpointLandscapePhone(`max-width: ${690 - $paddingSmall * 2}px;`)};
`;

export const LevelCalculatorPopupOpenButton = styled.div`
  cursor: pointer;
`;
