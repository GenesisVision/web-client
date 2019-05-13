import { FormikProps, withFormik } from "formik";
import {
  NotificationSettingViewModelConditionTypeEnum,
  NotificationViewModelTypeEnum,
  ProgramInfo
} from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import GVFormikField from "shared/components/gv-formik-field";
import GVTextField from "shared/components/gv-text-field";
import Select from "shared/components/select/select";
import { number, object } from "yup";

const ProgramNotificationCreateForm: React.FC<Props> = props => {
  const {
    t,
    program,
    handleSubmit,
    values,
    isValid,
    dirty,
    isSubmitting
  } = props;
  const { conditionType } = values;
  const isProfit = conditionType === "Profit";
  const isLevel = conditionType === "Level";
  return (
    <form id="create-notification" onSubmit={handleSubmit}>
      <div className="dialog__top">
        <div className="dialog__header">
          <h2>{t("notifications-page.create.title")}</h2>
          <p>{program.title}</p>
        </div>
        <GVFormikField
          name="conditionType"
          component={GVTextField}
          label={t("notifications-page.create.type-label")}
          InputComponent={Select}
        >
          <option value="Profit">
            {t("notifications-page.create.Profit.title")}
          </option>
          <option value="Level">
            {t("notifications-page.create.Level.title")}
          </option>
          <option value="AvailableToInvest">
            {t("notifications-page.create.AvailableToInvest.title")}
          </option>
        </GVFormikField>
      </div>
      <div className="dialog__bottom">
        <GVFormikField
          name="conditionAmount"
          label={t("notifications-page.create.amount-label")}
          component={GVTextField}
          adornment={isProfit ? "%" : null}
          autoComplete="off"
          InputComponent={NumberFormat}
          isAllowed={(values: NumberFormatValues) => {
            const { floatValue, formattedValue } = values;
            if (isProfit) {
              return (
                formattedValue === "" || (floatValue > 0 && floatValue <= 1000)
              );
            }
            if (isLevel) {
              return (
                formattedValue === "" || (floatValue > 0 && floatValue <= 7)
              );
            }
            return true;
          }}
        />
        <div className="form-error">{props.errorMessage}</div>
        <div className="dialog__buttons">
          <GVButton
            color="primary"
            type="submit"
            disabled={isSubmitting || !isValid || !dirty}
          >
            {t("buttons.create")}
          </GVButton>
        </div>
      </div>
    </form>
  );
};

export default compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, Values>({
    displayName: "create-notification",
    mapPropsToValues: () => ({
      type: "ProgramCondition",
      conditionType: "Profit",
      conditionAmount: undefined
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        conditionAmount: number().required(
          t("notifications-page.create.amount-required")
        )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  })
)(ProgramNotificationCreateForm);

interface Props extends OwnProps, InjectedTranslateProps, FormikProps<Values> {}

interface OwnProps {
  program: ProgramInfo;
  errorMessage: string;
  onSubmit: (
    values: Values,
    setSubmitting: (isSubmitting: boolean) => void
  ) => void;
}

interface Values {
  type: NotificationViewModelTypeEnum;
  conditionType: NotificationSettingViewModelConditionTypeEnum;
  conditionAmount?: number;
}
