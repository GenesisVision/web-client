import { $negativeColor } from "components/gv-styles/gv-colors/gv-colors";
import { $fontSizeH4, $fontSizeSmall } from "components/gv-styles/gv-sizes";
import * as React from "react";
import styled from "styled-components";
import { fontSize } from "utils/style/style-mixins";

export interface IFormErrorProps {
  small?: boolean;
  error?: string;
}

const Error = styled.div<IFormErrorProps>`
  color: ${$negativeColor};
  ${({ small }) => (small ? fontSize($fontSizeSmall) : fontSize($fontSizeH4))}
`;

const FormError: React.FC<IFormErrorProps> = React.memo(({ error, small }) => {
  if (error) {
    return <Error small={small}>{error}</Error>;
  }
  return null;
});

export default FormError;
