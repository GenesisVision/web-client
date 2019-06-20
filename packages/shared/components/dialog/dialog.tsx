import "./dialog.scss";

import classNames from "classnames";
import * as React from "react";
import { useCallback } from "react";
import EventListener from "react-event-listener";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import { CloseIcon } from "shared/components/icon/close-icon";
import Modal, { BodyFix } from "shared/components/modal/modal";

export const _Dialog: React.FC<IDialogProps & InjectedTranslateProps> = ({
  t,
  open,
  onClose,
  className,
  children,
  wider
}) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => event.keyCode === 27 && onClose(event),
    [onClose]
  );
  return (
    <Modal open={open} fixed disableBackdropClick>
      <BodyFix />
      <EventListener target={document} onKeyUp={handleKeyPress} />
      <div className="dialog__content">
        <div className="dialog__background" />
        <div className="dialog__backdrop" onClick={onClose} />
        <GVButton
          variant="text"
          color="secondary"
          className={classNames("dialog__close dialog__close--outside", {
            "dialog__close--wider": wider
          })}
          onClick={onClose}
        >
          <>
            <CloseIcon /> {t("buttons.close")}
          </>
        </GVButton>
        <div className={classNames("dialog", className)}>
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

const Dialog = translate()(React.memo(_Dialog));
export default Dialog;

export interface IDialogProps {
  open: boolean;
  onClose: (param?: any) => void;
  className?: string;
  wider?: boolean;
}
