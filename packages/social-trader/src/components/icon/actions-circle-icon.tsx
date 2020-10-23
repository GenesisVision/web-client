import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";
import styled from "styled-components";
import { $labelColor, $panelBackgroundColor } from "utils/style/colors";

const StyledIcon = styled(Icon)`
  circle[fill] {
    fill: ${({ primary }: IIconProps) =>
      primary ? "white" : `${$labelColor}70`};
  }
  g[fill] {
    fill: ${({ primary }: IIconProps) =>
      primary ? $panelBackgroundColor : "white"};
  }
`;

export const _ActionsCircleIcon: React.FC<IIconProps> = props => (
  <StyledIcon {...props}>
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(-420 -1055)">
          <g transform="translate(120 866)">
            <g transform="translate(300 189)">
              <circle fill="#FFF" cx="15.5" cy="15.5" r="15.5" />
              <g transform="translate(14 8)" fill="#212C34">
                <circle
                  transform="rotate(90 1.5 1.5)"
                  cx="1.5"
                  cy="1.5"
                  r="1.5"
                />
                <circle
                  transform="rotate(90 1.5 7.5)"
                  cx="1.5"
                  cy="7.5"
                  r="1.5"
                />
                <circle
                  transform="rotate(90 1.5 13.5)"
                  cx="1.5"
                  cy="13.5"
                  r="1.5"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </StyledIcon>
);

export const ActionsCircleIcon = React.memo(_ActionsCircleIcon);
