import { GvInputAdornment } from "components/gv-input/gv-input-adornment";
import { GvInputLabel } from "components/gv-input/gv-input-label";
import { GvInputWrapper } from "components/gv-input/gv-input-wrapper";
import {
  GVInputStyles,
  IPropsGvInput
} from "components/gv-input/gv-input.styles";
import { Text } from "components/text/text";
import React from "react";
import styled from "styled-components";
import { $negativeColor } from "utils/style/colors";
import { fontSize } from "utils/style/mixins";
import { $fontSizeXsmall } from "utils/style/sizes";

interface Props extends IPropsGvInput {
  inputElement: JSX.Element;
}

const Error = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 100%;
  ${fontSize($fontSizeXsmall)};
  color: ${$negativeColor};
`;

const StyledDiv = styled.div<Props>`
  ${GVInputStyles}
`;

const _GvInput: React.FC<Props> = props => {
  const {
    showError = true,
    noMargin,
    wide,
    label,
    focused,
    adornment,
    value,
    touched,
    error,
    inputElement,
    adornmentPosition = "end"
  } = props;
  return (
    <GvInputWrapper margin={!noMargin} wide={wide}>
      {label && (
        <GvInputLabel
          shrink={
            !!focused || !!adornment || (value !== undefined && value !== "")
          }
        >
          <Text wrap={false} muted size={"large"}>
            {label}
          </Text>
        </GvInputLabel>
      )}
      <StyledDiv {...props}>
        {inputElement}
        {adornment && (
          <GvInputAdornment adornmentPosition={adornmentPosition}>
            {adornment}
          </GvInputAdornment>
        )}
      </StyledDiv>
      {showError && touched && error && <Error>{error}</Error>}
    </GvInputWrapper>
  );
};

export const GvInput = React.memo(_GvInput);
