import { Push } from "components/link/link";
import useIsOpen from "hooks/is-open.hook";
import SignupDialog from "pages/auth/signup/signup-popup/signup-dialog";
import { JoinButton } from "pages/landing-page/components/join-button";
import React, { useCallback } from "react";
import { LOGIN_ROUTE } from "routes/app.routes";
import { getLogged } from "services/auth-service";

export const SignupButton: React.FC<Props> = ({
  eventLabel,
  children,
  color,
  isSignup,
  isText
}) => {
  const [isOpen, setOpen, setClose] = useIsOpen();
  const handleClick = useCallback(() => {
    const isLogged = getLogged();
    if (isLogged && !isSignup) Push(LOGIN_ROUTE);
    else setOpen();
  }, [isSignup]);
  return (
    <>
      <JoinButton
        eventLabel={eventLabel}
        color={color}
        onClick={handleClick}
        isText={isText}
      >
        {children}
      </JoinButton>
      <SignupDialog open={isOpen} onClose={setClose} />
    </>
  );
};

interface Props {
  eventLabel?: string;
  children: string | JSX.Element;
  color?: "primary" | "secondary" | "pink";
  isSignup?: boolean;
  isText?: boolean;
}
