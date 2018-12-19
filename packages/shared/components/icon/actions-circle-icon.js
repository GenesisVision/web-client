import React from "react";
import { Icon } from "shared/components/icon/icon";

export const ActionsCircleIcon = props => {
  return (
    <Icon type={"actions-circle"} {...props}>
      <svg
        width="31"
        height="31"
        viewBox="0 0 31 31"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="ui" fill="none" fillRule="evenodd">
          <g id="1600_0_6" transform="translate(-420 -1055)">
            <g id="Group-28" transform="translate(120 866)">
              <g id="Group-27" transform="translate(300 189)">
                <circle id="Oval-11" fill="#FFF" cx="15.5" cy="15.5" r="15.5" />
                <g id="dots" transform="translate(14 8)" fill="#212C34">
                  <circle
                    id="Oval-13"
                    transform="rotate(90 1.5 1.5)"
                    cx="1.5"
                    cy="1.5"
                    r="1.5"
                  />
                  <circle
                    id="Oval-13-Copy"
                    transform="rotate(90 1.5 7.5)"
                    cx="1.5"
                    cy="7.5"
                    r="1.5"
                  />
                  <circle
                    id="Oval-13-Copy-2"
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
};
