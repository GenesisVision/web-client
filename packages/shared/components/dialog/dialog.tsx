import "./dialog.scss";

import classNames from "classnames";
import * as React from "react";
import { ReactNode, useState } from "react";
import GVButton from "shared/components/gv-button";
import { CloseIcon } from "shared/components/icon/close-icon";
import Modal, { BodyFix } from "shared/components/modal/modal";

export const _Dialog: React.FC<IDialogProps> = ({
  top,
  open,
  onClose,
  className,
  children
}) => {
  const [target, setTarget] = useState<EventTarget | null>(null);

  const handleBackdropClick = React.useCallback(
    event => {
      if (target === event.currentTarget && onClose) {
        onClose(event);
      }
    },
    [onClose, target]
  );

  return (
    <Modal open={open} fixed onClose={onClose}>
      <div
        className="dialog-wrapper"
        onClick={handleBackdropClick}
        onMouseDown={event => {
          setTarget(event.target);
        }}
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

const Dialog = React.memo(_Dialog);
export default Dialog;

export interface IDialogProps {
  children?: ReactNode;
  open: boolean;
  onClose: (param?: any) => void;
  className?: string;
  top?: boolean;
}
