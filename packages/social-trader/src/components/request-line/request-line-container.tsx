import { Center } from "components/center/center";
import {
  $borderColor,
  $textAccentColor
} from "components/gv-styles/gv-colors/gv-colors";
import { $paddingXxsmall } from "components/gv-styles/gv-sizes";
import styled from "styled-components";

export const RequestLineContainer = styled(Center)`
  padding: ${$paddingXxsmall}px 0;
  color: ${$textAccentColor};

  &:not(:last-of-type) {
    border-bottom: 1px solid ${$borderColor};
  }
`;
