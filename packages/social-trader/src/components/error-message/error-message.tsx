import * as React from "react";
import styled from "styled-components";
import { $negativeColor } from "utils/style/colors";
import { fontSize } from "utils/style/mixins";
import { $fontSizeSmall } from "utils/style/sizes";

export enum MESSAGE_TYPES {
  DEFAULT = "DEFAULT",
  OVER = "OVER"
}

interface IErrorMessageProps {
  type?: MESSAGE_TYPES;
}

const ErrorMessage = styled.span<IErrorMessageProps>`
  font-weight: 600;
  color: ${$negativeColor};
  ${fontSize($fontSizeSmall)};
  ${({ type }) => type === MESSAGE_TYPES.OVER && "position: absolute;"}
`;

export default ErrorMessage;
