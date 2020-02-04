import "./modal.scss";

import classNames from "classnames";
import Portal from "components/portal/portal";
import React, { useCallback, useEffect } from "react";
import EventListener from "react-event-listener";

export const BodyFix = () => {
  useEffect(() => {
    document.body.classList.add("body--fixed");
    return () => document.body.classList.remove("body--fixed");
  }, []);
  return null;
};

const _Modal: React.FC<Props> = ({
  onClose,
  open,
  noAbsolute,
  transparentBackdrop,
  children,
  fixed
}) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent & React.MouseEvent<HTMLElement>) =>
      event.keyCode === 27 && handleClose(event),
    []
  );

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => handleClose(event),
    []
  );

  const handleClose = useCallback(
    (event: React.MouseEvent<HTMLElement>): void => onClose && onClose(event),
    [onClose]
  );

  return (
    <Portal open={open}>
      <div
        className={classNames("modal", {
          "modal--position-absolute": !noAbsolute,
          "modal--position-fixed": fixed
        })}
      >
        <EventListener target={"document"} onKeyUp={handleKeyPress}>
          <div
            className={classNames("modal__backdrop", {
              "modal__backdrop--transparent": transparentBackdrop
            })}
            onClick={handleBackdropClick}
          />
        </EventListener>
        {children}
      </div>
    </Portal>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
  noAbsolute?: boolean;
  transparentBackdrop?: boolean;
  fixed?: boolean;
}

const Modal = React.memo(_Modal);
export default Modal;
