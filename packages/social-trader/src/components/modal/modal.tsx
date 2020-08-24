import clsx from "clsx";
import Portal from "components/portal/portal";
import React, { useCallback, useEffect } from "react";
import EventListener from "react-event-listener";

import styles from "./modal.module.scss";

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
      <div
        className={clsx(styles["modal"], {
          [styles["modal--position-absolute"]]: !absolute,
          [styles["modal--position-fixed"]]: fixed
        })}
      >
        <EventListener target={"document"} onKeyUp={handleKeyPress}>
          <div
            className={clsx(styles["modal__backdrop"], {
              [styles["modal__backdrop--transparent"]]: transparentBackdrop
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
  absolute?: boolean;
  transparentBackdrop?: boolean;
  fixed?: boolean;
}

const Modal = React.memo(_Modal);
export default Modal;
