import { GvInputAdornment } from "components/gv-input/gv-input-adornment";
import { GvInputLabel } from "components/gv-input/gv-input-label";
import { GvInputWrapper } from "components/gv-input/gv-input-wrapper";
import {
  GVInputStyles,
  IPropsGvInput
} from "components/gv-input/gv-input.styles";
import { $negativeColor } from "components/gv-styles/gv-colors/gv-colors";
import { $fontSizeXsmall } from "components/gv-styles/gv-sizes";
import { Text } from "components/text/text";
import { withStyles } from "decorators/withStyles";
import React from "react";
import styled from "styled-components";
import { fontSize } from "utils/style/style-mixins";

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

const _GvInput: React.FC<Props> = ({
  showError = true,
  noMargin,
  wide,
  label,
  focused,
  adornment,
  value,
  className,
  touched,
  error,
  inputElement,
  adornmentPosition = "end"
}) => {
  return (
    <GvInputWrapper margin={!noMargin} wide={wide}>
      {label && (
        <GvInputLabel
          shrink={
            !!focused || !!adornment || (value !== undefined && value !== "")
          }
        >
          <Text muted size={"large"}>
            {label}
          </Text>
        </GvInputLabel>
      )}
      <div className={className}>
        {inputElement}
        {adornment && (
          <GvInputAdornment adornmentPosition={adornmentPosition}>
            {adornment}
          </GvInputAdornment>
        )}
      </div>
      {showError && touched && error && <Error>{error}</Error>}
    </GvInputWrapper>
  );
};

export const GvInput = withStyles<Props>({ dynamicStyles: GVInputStyles })(
  React.memo(_GvInput)
);
