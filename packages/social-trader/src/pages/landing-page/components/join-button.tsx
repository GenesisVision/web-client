import { ToType } from "components/link/link";
import LPButton from "pages/landing-page/components/lp-button/lp-button";
import React, { useCallback } from "react";
import { sendEventToGA } from "utils/ga";
import { OptionalClickable } from "utils/types";

export const JoinButton: React.FC<Props> = ({
  onClick,
  children,
  href,
  eventLabel,
  color,
  isText,
  circle,
  className
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
    <LPButton
      className={className}
      color={color}
      href={href}
      onClick={clickHandle}
      circle={circle}
      isText={isText}
    >
      {children}
    </LPButton>
  );
};

interface Props extends OptionalClickable {
  color?: "primary" | "secondary" | "pink";
  eventLabel?: string;
  children: string | JSX.Element;
  href?: string | ToType;
  className?: string;
  circle?: boolean;
  isText?: boolean;
}
