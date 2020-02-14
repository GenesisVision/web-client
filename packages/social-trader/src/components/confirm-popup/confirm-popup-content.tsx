import { IDialogProps } from "components/dialog/dialog";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import { InjectedFormikProps, withFormik } from "formik";
import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";

const _ConfirmPopupContent: React.ComponentType<InjectedFormikProps<
  IConfirmPopupContentProps & WithTranslation,
  {}
>> = ({
  t,
  onCancel,
  header,
  body,
  applyButtonText = t("buttons.apply"),
  cancelButtonText = t("buttons.cancel"),
  handleSubmit,
  isSubmitting
}) => (
  <form onSubmit={handleSubmit} noValidate>
    <DialogTop title={header} />
    <DialogBottom>
      <div className="dialog__text">
        <p>{body}</p>
      </div>
      <DialogButtons>
        <GVButton wide={!onCancel} type="submit" disabled={isSubmitting}>
          {applyButtonText}
        </GVButton>
        {onCancel && (
          <GVButton color="secondary" variant="outlined" onClick={onCancel}>
            {cancelButtonText}
          </GVButton>
        )}
      </DialogButtons>
    </DialogBottom>
  </form>
);

const ConfirmPopupContent = compose<
  React.ComponentType<IConfirmPopupContentProps>
>(
  translate(),
  withFormik<IConfirmPopupContentProps, {}>({
    displayName: "confirm-form",
    mapPropsToValues: () => ({}),
    handleSubmit: (_, { props, setSubmitting }) => {
      props.onApply(setSubmitting);
    }
  }),
  React.memo
)(_ConfirmPopupContent);
export default ConfirmPopupContent;

export interface IConfirmPopupContentProps extends IDialogProps {
  onApply(setSubmitting: SetSubmittingType): void;
  onCancel?(): void;
  header?: string;
  body?: React.ReactNode;
  applyButtonText?: string;
  cancelButtonText?: string;
  className?: string;
  disabled?: boolean;
}
