import "./dialog.scss";

import classNames from "classnames";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import { CloseIcon } from "shared/components/icon/close-icon";
import Modal, { BodyFix } from "shared/components/modal/modal";

export const _Dialog: React.FC<IDialogProps & InjectedTranslateProps> = ({
  t,
  open,
  onClose,
  className,
  children
}) => (
  <Modal open={open} fixed onClose={onClose}>
    <BodyFix />
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
  </Modal>
);

const Dialog = translate()(React.memo(_Dialog));
export default Dialog;

export interface IDialogProps {
  open: boolean;
  onClose: (param?: any) => void;
  className?: string;
}
