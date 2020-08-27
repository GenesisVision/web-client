import Portal from "components/portal/portal";
import React, { useCallback, useEffect } from "react";
import EventListener from "react-event-listener";
import styled from "styled-components";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
  absolute?: boolean;
  transparentBackdrop?: boolean;
  fixed?: boolean;
}

export const BodyFix = () => {
  useEffect(() => {
    document.body.classList.add("body--fixed");
    return () => document.body.classList.remove("body--fixed");
  }, []);
  return null;
};

const Backdrop = styled.div<{
  black?: boolean;
}>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  opacity: 0.7;
  ${({ black }) =>
    black &&
    `
    background-color: black;
   `};
`;

const Container = styled.div<{
  absolute?: boolean;
  fixed?: boolean;
}>`
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1300;
  position: ${({ fixed, absolute }) => {
    if (fixed) return "fixed";
    if (absolute) return "absolute";
  }};
`;

const _Modal: React.FC<Props> = ({
  onClose,
  open,
  absolute = true,
  transparentBackdrop,
  children,
  fixed
}) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent & React.MouseEvent<HTMLElement>) =>
      event.keyCode === 27 && handleClose(event),
    [onClose]
  );

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => handleClose(event),
    [onClose]
  );

  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => onClose && onClose(event),
    [onClose]
  );

  return (
    <Portal open={open}>
      <Container absolute={absolute} fixed={fixed}>
        <EventListener target={"document"} onKeyUp={handleKeyPress}>
          <Backdrop
            black={!transparentBackdrop}
            onClick={handleBackdropClick}
          />
        </EventListener>
        {children}
      </Container>
    </Portal>
  );
};

const Modal = React.memo(_Modal);
export default Modal;
