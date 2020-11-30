import { dynamicTextStyles } from "components/text/text.styles";
import { ITextProps } from "components/text/text.types";
import React from "react";
import styled from "styled-components";

export const Text = styled.span<ITextProps>`
  ${dynamicTextStyles}
`;
