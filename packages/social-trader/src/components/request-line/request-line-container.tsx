import { Center } from "components/center/center";
import {
  $borderColor,
  $textAccentColor
} from "components/gv-styles/gv-colors/gv-colors";
import { $paddingXxsmall } from "components/gv-styles/gv-sizes";
import styled, { css } from "styled-components";

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
