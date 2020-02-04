import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const Mt4Icon: React.FC<IIconProps> = props => (
  <Icon type={"mt4"} {...props}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.10663 13.7106L6.09704 9.68423L4.12221 13.0012H3.4224L1.45715 9.77051V13.7106H0V7H1.2846L3.79627 11.1701L6.2696 7H7.54461L7.56378 13.7106H6.10663Z"
        fill="#00BDAF"
      />
      <path
        d="M10.5459 8.26542H8.39856V7H14.2464V8.26542H12.099V13.7106H10.5459V8.26542Z"
        fill="#00BDAF"
      />
      <path
        d="M20 12.3014H18.9071V13.7106H17.3925V12.3014H13.7783V11.2564L16.9419 7H18.5716L15.6381 11.0359H17.4404V9.7801H18.9071V11.0359H20V12.3014Z"
        fill="#00BDAF"
      />
    </svg>
  </Icon>
);
