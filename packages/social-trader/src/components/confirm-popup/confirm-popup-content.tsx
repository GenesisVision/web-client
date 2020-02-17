import { IDialogProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const _ConfirmPopupContent: React.ComponentType<IConfirmPopupContentProps> = ({
  errorMessage,
  onApply,
  onCancel,
  header,
  body,
  applyButtonText,
  cancelButtonText
}) => {
  const [t] = useTranslation();
  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitted }
  } = useForm();

  const isSuccessful = isSubmitted && !errorMessage;
  const disabled = isSubmitting || isSuccessful;
  return (
    <form onSubmit={handleSubmit(onApply)} noValidate>
      <DialogTop title={header} />
      <DialogBottom>
        <div className="dialog__text">
          <p>{body}</p>
        </div>
        <DialogButtons>
          <GVButton
            wide={!onCancel}
            type="submit"
            disabled={disabled}
            isPending={isSubmitting}
            isSuccessful={isSuccessful}
          >
            {applyButtonText || t("buttons.apply")}
          </GVButton>
          {onCancel && (
            <GVButton color="secondary" variant="outlined" onClick={onCancel}>
              {cancelButtonText || t("buttons.cancel")}
            </GVButton>
          )}
        </DialogButtons>
      </DialogBottom>
    </form>
  );
};

const ConfirmPopupContent = React.memo(_ConfirmPopupContent);
export default ConfirmPopupContent;

export interface IConfirmPopupContentProps extends IDialogProps {
  errorMessage?: string;
  onApply: () => void;
  onCancel?: () => void;
  header?: string;
  body?: React.ReactNode;
  applyButtonText?: string;
  cancelButtonText?: string;
  disabled?: boolean;
}
