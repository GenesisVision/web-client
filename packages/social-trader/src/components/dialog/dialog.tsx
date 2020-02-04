import "./dialog.scss";

import classNames from "classnames";
import GVButton from "components/gv-button";
import { CloseIcon } from "components/icon/close-icon";
import Modal, { BodyFix } from "components/modal/modal";
import React, { ReactNode, useCallback, useState } from "react";

export const Dialog: React.FC<IDialogProps> = ({
  top,
  open,
  onClose,
  className,
  children
}) => {
  const [target, setTarget] = useState<EventTarget | null>(null);

  const handleBackdropClick = useCallback(
    event => {
      if (target === event.currentTarget && onClose) {
        onClose(event);
      }
    },
    [onClose, target]
  );

  const handleMouseDown = useCallback(event => {
    setTarget(event.target);
  }, []);

  return (
    <Modal open={open} fixed onClose={onClose}>
      <div
        className="dialog-wrapper"
        onClick={handleBackdropClick}
        onMouseDown={handleMouseDown}
      >
        <BodyFix />
        <div
          className={classNames("dialog", className, { "dialog--top": top })}
        >
          <GVButton
            variant="text"
            color="secondary"
            className="dialog__close dialog__close--inside"
            onClick={onClose}
          >
            <CloseIcon />
          </GVButton>
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default Dialog;

export interface IDialogProps extends IDialogOuterProps {
  children?: ReactNode;
  className?: string;
  top?: boolean;
}
export interface IDialogOuterProps {
  open: boolean;
  onClose: (param?: any) => void;
}
