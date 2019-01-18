import { GVButton } from "gv-react-components";
import React from "react";
import { TranslationFunction, translate } from "react-i18next";
import Dialog from "shared/components/dialog/dialog";

export interface IConfirmPopupProps {
  t: TranslationFunction;
  open: boolean;
  onClose(): void;
  onApply(): void;
  onCancel?(): void;
  header?: React.ReactNode;
  body?: React.ReactNode;
  applyButtonText?: string;
  cancelButtonText?: string;
  className?: string;
  disabled?: boolean;
}

const ConfirmPopup: React.SFC<IConfirmPopupProps> = ({
  t,
  open,
  onClose,
  onApply,
  onCancel,
  header,
  body,
  applyButtonText,
  cancelButtonText,
  className,
  disabled
}) => {
  applyButtonText = applyButtonText || t("buttons.apply");
  cancelButtonText = cancelButtonText || t("buttons.cancel");
  return (
    <Dialog open={open} onClose={onClose} className={className}>
      <div className="dialog__top">
        {header && <h2>{header}</h2>}
        <div className="dialog__text">
          <p>{body}</p>
        </div>
        <div className="dialog__buttons">
          <GVButton onClick={onApply} disabled={disabled}>
            {applyButtonText}
          </GVButton>
          {onCancel && (
            <GVButton color="secondary" variant="outlined" onClick={onCancel}>
              {cancelButtonText}
            </GVButton>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default translate()(ConfirmPopup);
