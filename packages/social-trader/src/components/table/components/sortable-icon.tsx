import { SORTING_DIRECTION } from "components/table/helpers/sorting.helpers";
import React from "react";
import styled, { css } from "styled-components";
import { transition } from "utils/style/mixins";
import { mediaBreakpointLandscapePhone } from "utils/style/media";

interface Props {
  className?: string;
  sortingDirection: SORTING_DIRECTION;
}

const sortableBorderIcon = css`
  position: absolute;
  right: 0;
  bottom: 3px;
  content: "";
  border-top: 1px solid white;
`;

export const SortableIcon = styled.span<Props>`
  cursor: pointer;
  padding-right: 15px;
  ${mediaBreakpointLandscapePhone(`
     padding-right: 25px;
  `)}
  span {
    opacity: 1;
  }
  position: relative;
  &::before {
    ${transition("width")};
    ${sortableBorderIcon};
    height: 4px;
    width: ${({ sortingDirection }) => {
      switch (sortingDirection) {
        case SORTING_DIRECTION.ASC:
          return "5px";
        case SORTING_DIRECTION.DESC:
          return "10px";
        case SORTING_DIRECTION.NONE:
        default:
          return "0";
      }
    }};
  }
  &::after {
    ${transition("width")};
    ${sortableBorderIcon};
    width: ${({ sortingDirection }) => {
      switch (sortingDirection) {
        case SORTING_DIRECTION.ASC:
          return "10px";
        case SORTING_DIRECTION.DESC:
          return "5px";
        case SORTING_DIRECTION.NONE:
        default:
          return "0";
      }
    }};
  }
`;
