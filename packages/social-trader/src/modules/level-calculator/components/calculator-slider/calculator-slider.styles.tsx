import { Center } from "components/center/center";
import styled from "styled-components";
import { $mainColor, $textLightColor } from "utils/style/colors";
import { mediaBreakpointLandscapePhone } from "utils/style/media";
import { fontSize } from "utils/style/mixins";
import { $fontSizeSmall, $paddingXxsmall } from "utils/style/sizes";

export const CalculatorSliderTitle = styled(Center)`
  ${fontSize($fontSizeSmall)};
  cursor: default;
  white-space: nowrap;
  color: ${$textLightColor};
`;

export const CalculatorSliderValue = styled.div<{ wideValue?: boolean }>`
  ${fontSize(15)};
  cursor: default;
  white-space: nowrap;
  color: ${$mainColor};
  font-weight: 600;
  max-width: ${({ wideValue }) => (wideValue ? "120px" : "70px")};
  margin: 0;
  padding-bottom: ${$paddingXxsmall / 2}px;
`;

export const CalculatorSliderHeading = styled.div<{ editableValue?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ editableValue }) =>
    editableValue ? $paddingXxsmall / 2 : $paddingXxsmall}px;
`;

export const CalculatorSliderContainer = styled.div`
  width: 100%;
  ${mediaBreakpointLandscapePhone(`max-width: 255px;`)};
`;
