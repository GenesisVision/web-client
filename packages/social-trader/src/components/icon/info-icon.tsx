import { Icon, IIconProps } from "components/icon/icon";
import * as React from "react";

export const InfoIcon: React.FC<IIconProps> = props => (
  <Icon {...props}>
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0V0ZM11.53 15.46C11.4604 15.8065 11.2729 16.1182 10.9994 16.3422C10.726 16.5661 10.3835 16.6885 10.03 16.6885C9.67656 16.6885 9.33401 16.5661 9.06057 16.3422C8.78713 16.1182 8.59965 15.8065 8.53 15.46V8.82C8.59965 8.47348 8.78713 8.16177 9.06057 7.93782C9.33401 7.71387 9.67656 7.5915 10.03 7.5915C10.3835 7.5915 10.726 7.71387 10.9994 7.93782C11.2729 8.16177 11.4604 8.47348 11.53 8.82V15.46ZM10 6.05C9.66731 6.05198 9.34153 5.95514 9.06394 5.77174C8.78635 5.58835 8.56947 5.32667 8.44078 5.01987C8.31209 4.71307 8.27739 4.37497 8.34108 4.04842C8.40477 3.72188 8.56398 3.4216 8.79852 3.18564C9.03307 2.94969 9.3324 2.78869 9.65856 2.72305C9.98472 2.65741 10.323 2.69009 10.6306 2.81695C10.9381 2.9438 11.2011 3.15912 11.3862 3.43561C11.5712 3.7121 11.67 4.0373 11.67 4.37C11.67 4.81384 11.4944 5.23964 11.1815 5.55442C10.8686 5.86919 10.4438 6.04736 10 6.05Z"
        fill="#00BDAF"
      />
    </svg>
  </Icon>
);
