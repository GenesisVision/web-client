import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import { InjectedFormikProps, withFormik } from "formik";
import { PasswordModel } from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import { SetSubmittingType } from "utils/types";
import { object, string } from "yup";

const GenerateRecoveryForm: React.FC<InjectedFormikProps<
  Props,
  IFormValues
>> = ({ t, handleSubmit, errorMessage, isSubmitting }) => (
  <>
    <DialogTop title={t("2fa-page.codes.generate-recovery-codes")} />
    <DialogBottom>
      <form
        id="generate-recovery-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <GVFormikField
          name={FIELDS.password}
          type="password"
          label={t("2fa-page.password")}
          component={GVTextField}
          autoComplete="new-password"
        />
        <DialogError error={errorMessage} />
        <DialogButtons>
          <GVButton
            wide
            className="google-auth__button"
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {t("buttons.generate")}
          </GVButton>
        </DialogButtons>
      </form>
    </DialogBottom>
  </>
);

enum FIELDS {
  password = "password"
}

interface Props extends WithTranslation, OwnProps {}
interface OwnProps {
  errorMessage?: string;
  onSubmit(twoFactorCode: IFormValues, setSubmitting: SetSubmittingType): void;
}
interface IFormValues extends PasswordModel {}

const GenerateRecoveryWithFormik = compose<React.ComponentType<OwnProps>>(
  translate(),
  withFormik<Props, IFormValues>({
    displayName: "generate-recovery-form",
    mapPropsToValues: () => ({
      [FIELDS.password]: ""
    }),
    validationSchema: (props: Props) =>
      object().shape({
        [FIELDS.password]: string().required(
          props.t("2fa-page.password-required")
        )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(GenerateRecoveryForm);

export default GenerateRecoveryWithFormik;
