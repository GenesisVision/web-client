import {
  $backgroundColor,
  $primaryColor
} from "components/gv-styles/gv-colors/gv-colors";
import { $paddingSmall, $paddingXsmall } from "components/gv-styles/gv-sizes";
import React from "react";
import styled from "styled-components";
import { Sizeable } from "utils/types";

interface Props extends Sizeable {}

const size = $paddingXsmall;

export const Li = styled.li<Props>`
  position: relative;
  padding-left: ${size * 2}px;
  &::before {
    border: 7px solid ${$backgroundColor};
    content: "";
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    display: block;
    border-radius: 50%;
    background: ${$primaryColor};
    left: 0;
    box-sizing: border-box;
  }
  ${({ size }) => {
    switch (size) {
      case "small":
        return `margin-top: ${$paddingSmall};`;
    }
  }}
`;
