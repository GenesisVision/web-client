import { InjectedFormikProps, withFormik } from "formik";
import { GVButton } from "gv-react-components";
import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import Dialog, { IDialogProps } from "shared/components/dialog/dialog";
import { SetSubmittingType } from "shared/utils/types";

const _ConfirmPopup: React.ComponentType<
  InjectedFormikProps<IConfirmPopupProps & InjectedTranslateProps, {}>
> = ({
  t,
  open,
  onClose,
  onCancel,
  header,
  body,
  applyButtonText = t("buttons.apply"),
  cancelButtonText = t("buttons.cancel"),
  className,
  handleSubmit,
  isSubmitting
}) => {
  return (
    <Dialog open={open} onClose={onClose} className={className}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="dialog__top">
          {header && <h2>{header}</h2>}
          <div className="dialog__text">
            <p>{body}</p>
          </div>
          <div className="dialog__buttons">
            <GVButton type="submit" disabled={isSubmitting}>
              {applyButtonText}
            </GVButton>
            {onCancel && (
              <GVButton color="secondary" variant="outlined" onClick={onCancel}>
                {cancelButtonText}
              </GVButton>
            )}
          </div>
        </div>
      </form>
    </Dialog>
  );
};

const ConfirmPopup = React.memo(
  compose<React.ComponentType<IConfirmPopupProps>>(
    translate(),
    withFormik<IConfirmPopupProps, {}>({
      displayName: "confirm-form",
      mapPropsToValues: () => ({}),
      handleSubmit: (_, { props, setSubmitting }) => {
        props.onApply(setSubmitting);
      }
    })
  )(_ConfirmPopup)
);
export default ConfirmPopup;

export interface IConfirmPopupProps extends IDialogProps {
  onApply(setSubmitting: SetSubmittingType): void;
  onCancel?(): void;
  header?: React.ReactNode;
  body?: React.ReactNode;
  applyButtonText?: string;
  cancelButtonText?: string;
  className?: string;
  disabled?: boolean;
}
