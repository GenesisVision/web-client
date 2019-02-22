import { FormikProps, withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React, { ComponentType, FunctionComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import Hint from "shared/components/hint/hint";

import { makeSignalValidationSchema } from "./program-make-signal.validators";

interface IMakeSignalFormOwnProps {
  programName: string;
  errorMessage: string;
  onSubmit(
    values: IMakeSignalFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ): void;
}

export interface IMakeSignalFormValues {
  successFee: string;
  subscriptionFee: string;
}

type MakeSignalFormProps = InjectedTranslateProps &
  IMakeSignalFormOwnProps &
  FormikProps<IMakeSignalFormValues>;
const MakeSignalForm: FunctionComponent<MakeSignalFormProps> = ({
  t,
  dirty,
  handleSubmit,
  programName,
  errorMessage
}) => {
  return (
    <form id="makeSignalForm" onSubmit={handleSubmit}>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("manager.program-make-signal.title")}</h2>
          <p>{programName}</p>
        </div>
        ---
        <div className="create-program-settings__row">
          <div className="create-program-settings__row-title">
            {t("manager.create-program-page.settings.signal-provider-fees")}
          </div>
          <div className="create-program-settings__fee">
            <GVFormikField
              name="signalSubscriptionFee"
              label={t(
                "manager.create-program-page.settings.fields.monthly-subscription-fee"
              )}
              adornment="GVT"
              component={GVTextField}
              InputComponent={NumberFormat}
              autoComplete="off"
              decimalScale={4}
            />
            <Hint
              content={t(
                "manager.create-program-page.settings.hints.entry-fee"
              )}
              className="create-program-settings__fee-hint"
              vertical={"bottom"}
              tooltipContent={`
                    ${t(
                      "manager.create-program-page.settings.hints.entry-fee-description",
                      {
                        maxFee: 10 //programsInfo.managerMaxEntryFee
                      }
                    )}. ${t(
                "manager.create-program-page.settings.hints.entry-fee-levels"
              )}
                    `}
            />
          </div>
          <div className="create-program-settings__fee">
            <GVFormikField
              name="signalSuccessFee"
              label={t(
                "manager.create-program-page.settings.fields.signal-success-fee"
              )}
              adornment="%"
              component={GVTextField}
              InputComponent={NumberFormat}
              autoComplete="off"
              decimalScale={4}
            />
            <Hint
              content={t(
                "manager.create-program-page.settings.hints.success-fee"
              )}
              className="create-program-settings__fee-hint"
              vertical={"bottom"}
              tooltipContent={t(
                "manager.create-program-page.settings.hints.success-fee-description",
                {
                  maxFee: 10 //programsInfo.managerMaxSuccessFee
                }
              )}
            />
          </div>
        </div>
        ---
      </div>
      <div className="dialog__bottom">
        <div className="form-error">{errorMessage}</div>
        <div className="dialog__buttons">
          <GVButton
            type="submit"
            id="programMakeSignalSubmit"
            disabled={!dirty}
          >
            {t("manager.edit-program.confirm")}
          </GVButton>
        </div>
      </div>
    </form>
  );
};

export default compose<ComponentType<IMakeSignalFormOwnProps>>(
  translate(),
  withFormik<IMakeSignalFormOwnProps, IMakeSignalFormValues>({
    displayName: "make-signal-form",
    mapPropsToValues: () => ({
      successFee: "",
      subscriptionFee: ""
    }),
    validationSchema: makeSignalValidationSchema,
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(MakeSignalForm);
