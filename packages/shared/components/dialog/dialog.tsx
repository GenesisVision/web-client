import "./dialog.scss";

import classNames from "classnames";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import GVButton from "shared/components/gv-button";
import { CloseIcon } from "shared/components/icon/close-icon";
import Modal from "shared/components/modal/modal";
import GVScroll from "shared/components/scroll/gvscroll";

export const _Dialog: React.FC<IDialogProps & InjectedTranslateProps> = ({
  t,
  open,
  onClose,
  className,
  children
}) => (
  <Modal open={open} fixed onClose={onClose}>
    <GVScroll autoHide>
      <div className="dialog__content">
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
    </GVScroll>
  </Modal>
);

const Dialog = translate()(React.memo(_Dialog));
export default Dialog;

export interface IDialogProps {
  open: boolean;
  onClose: (param?: any) => void;
  className?: string;
}
