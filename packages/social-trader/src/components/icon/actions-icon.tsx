import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const ActionsIcon: React.FC<IIconProps> = props => (
  <Icon type={"actions"} {...props}>
    <svg width="3" height="15" viewBox="0 0 3 15">
      <g fill="none" fillRule="evenodd">
        <g transform="translate(-764 -1059)" fill="#FFF">
          <g transform="translate(120 866)">
            <g id="Group-30" transform="translate(644 193)">
              <g id="white_dots">
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
  </Icon>
);
