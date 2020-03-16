import { ToType } from "components/link/link";
import LPButton from "pages/landing-page/components/lp-button/lp-button";
import React, { useCallback } from "react";
import { sendEventToGA } from "utils/ga";

export const JoinButton: React.FC<Props> = ({
  onClick,
  children,
  href,
  eventLabel,
  color
}) => {
  const clickHandle = useCallback(() => {
    onClick && onClick();
    sendEventToGA({
      eventCategory: "Landing",
      eventAction: "Join",
      eventLabel
    });
  }, [eventLabel]);

  return (
    <LPButton color={color} href={href} onClick={clickHandle}>
      {children}
    </LPButton>
  );
};

interface Props {
  onClick?: VoidFunction;
  color?: "primary" | "secondary" | "pink";
  eventLabel?: string;
  children: string | JSX.Element;
  href?: string | ToType;
}
