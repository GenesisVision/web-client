import { Center } from "components/center/center";
import styled, { css } from "styled-components";
import { $borderColor, $textAccentColor } from "utils/style/colors";
import { $paddingXxsmall } from "utils/style/sizes";

const style = css`
  padding: ${$paddingXxsmall}px 0;
  color: ${$textAccentColor};

  &:not(:last-of-type) {
    border-bottom: 1px solid ${$borderColor};
  }
`;

export const RequestLineContainer = styled(Center)`
  ${style}
`;

export const RequestColumnContainer = styled.div`
  ${style}
`;
