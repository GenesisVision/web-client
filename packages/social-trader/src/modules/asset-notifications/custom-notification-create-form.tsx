import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogError } from "components/dialog/dialog-error";
import { DialogField } from "components/dialog/dialog-field";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import GVFormikField from "components/gv-formik-field";
import GVTextField from "components/gv-text-field";
import Select from "components/select/select";
import { FormikProps, withFormik } from "formik";
import {
  NotificationSettingConditionType,
  NotificationType,
  ProgramNotificationSettingList
} from "gv-api-web";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { compose } from "redux";
import { number, object } from "yup";

enum FIELDS {
  type = "type",
  conditionType = "conditionType",
  conditionAmount = "conditionAmount"
}

enum CONDITION_TYPE_VALUES {
  Profit = "Profit",
  Level = "Level",
  AvailableToInvest = "AvailableToInvest"
}

const _CustomNotificationCreateForm: React.FC<Props> = ({
  errorMessage,
  t,
  asset,
  handleSubmit,
  values,
  isValid,
  dirty,
  isSubmitting
}) => {
  const { conditionType } = values;
  const isProfit = conditionType === CONDITION_TYPE_VALUES.Profit;
  const isLevel = conditionType === CONDITION_TYPE_VALUES.Level;
  return (
    <form id="create-notification" onSubmit={handleSubmit}>
      <DialogTop
        title={t("notifications-page.create.title")}
        subtitle={asset.title}
      >
        <DialogField>
          <GVFormikField
            wide
            name={FIELDS.conditionType}
            component={GVTextField}
            label={t("notifications-page.create.type-label")}
            InputComponent={Select}
          >
            <option value={CONDITION_TYPE_VALUES.Profit}>
              {t("notifications-page.create.Profit.title")}
            </option>
            <option value={CONDITION_TYPE_VALUES.Level}>
              {t("notifications-page.create.Level.title")}
            </option>
            <option value={CONDITION_TYPE_VALUES.AvailableToInvest}>
              {t("notifications-page.create.AvailableToInvest.title")}
            </option>
          </GVFormikField>
        </DialogField>
      </DialogTop>
      <DialogBottom>
        <GVFormikField
          name={FIELDS.conditionAmount}
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
        <DialogError error={errorMessage} />
        <DialogButtons>
          <GVButton
            wide
            color="primary"
            type="submit"
            disabled={isSubmitting || !isValid || !dirty}
          >
            {t("buttons.create")}
          </GVButton>
        </DialogButtons>
      </DialogBottom>
    </form>
  );
};

const CustomNotificationCreateForm = compose<React.FC<OwnProps>>(
  translate(),
  withFormik<Props, ICustomNotificationCreateFormValues>({
    displayName: "create-notification",
    mapPropsToValues: () => ({
      [FIELDS.type]: "ProgramCondition",
      [FIELDS.conditionType]: CONDITION_TYPE_VALUES.Profit,
      [FIELDS.conditionAmount]: undefined
    }),
    validationSchema: ({ t }: Props) =>
      object().shape({
        [FIELDS.conditionAmount]: number().required(
          t("notifications-page.create.amount-required")
        )
      }),
    handleSubmit: (values, { props, setSubmitting }) => {
      props.onSubmit(values, setSubmitting);
    }
  }),
  React.memo
)(_CustomNotificationCreateForm);
export default CustomNotificationCreateForm;

interface Props
  extends OwnProps,
    WithTranslation,
    FormikProps<ICustomNotificationCreateFormValues> {}

interface OwnProps {
  asset: ProgramNotificationSettingList;
  onSubmit: (
    values: ICustomNotificationCreateFormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => void;
  errorMessage?: string;
}

export interface ICustomNotificationCreateFormValues {
  [FIELDS.type]: NotificationType;
  [FIELDS.conditionType]: NotificationSettingConditionType;
  [FIELDS.conditionAmount]?: number;
}
