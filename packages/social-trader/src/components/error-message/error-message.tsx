import { $negativeColor } from "components/gv-styles/gv-colors/gv-colors";
import { $fontSizeSmall } from "components/gv-styles/gv-sizes";
import * as React from "react";
import styled from "styled-components";
import { fontSize } from "utils/style/style-mixins";

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
