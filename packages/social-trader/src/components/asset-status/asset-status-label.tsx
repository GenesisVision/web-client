import { STATUS } from "constants/constants";
import * as React from "react";
import styled from "styled-components";
import {
  $levelColor4,
  $primaryColor,
  $textDarkColor,
  $textLightColor
} from "utils/style/colors";
import { OptionalClickable } from "utils/types";

interface Props extends OptionalClickable {
  status: STATUS;
}

const AssetStatusLabel = styled.span<Props>`
  color: ${({ status }) => {
    switch (status) {
      case STATUS.ACTIVE:
        return $textLightColor;
      case STATUS.INVESTING:
        return $primaryColor;
      case STATUS.WITHDRAWING:
        return $levelColor4;
      case STATUS.ENDED:
      case STATUS.PENDING:
        return $textDarkColor;
    }
  }};
  ${({ status }) => {
    switch (status) {
      case STATUS.INVESTING:
        return `
        border-bottom: 1px dashed;
        cursor: pointer;
        border-color: ${$primaryColor};
        `;
      case STATUS.WITHDRAWING:
        return `
        border-bottom: 1px dashed;
        cursor: pointer;
        border-color: ${$levelColor4};
        `;
    }
  }};
`;

export default AssetStatusLabel;
