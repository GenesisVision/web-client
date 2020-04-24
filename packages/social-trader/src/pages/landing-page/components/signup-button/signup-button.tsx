import useIsOpen from "hooks/is-open.hook";
import SignupDialog from "pages/auth/signup/signup-popup/signup-dialog";
import { JoinButton } from "pages/landing-page/components/join-button";
import React from "react";

export const SignupButton: React.FC<Props> = ({
  eventLabel,
  children,
  color
}) => {
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <>
      <JoinButton eventLabel={eventLabel} color={color} onClick={setOpen}>
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
}
