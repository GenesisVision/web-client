import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import Select from "shared/components/select/select";
import { number, object } from "yup";

class ProgramNotificationCreateForm extends Component {
  render() {
    const { t, program, handleSubmit, values, isValid, dirty } = this.props;
    const { conditionType } = values;
    const isProfit = conditionType === "Profit";
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
            <options value="Profit">
              {t("notifications-page.create.Profit.title")}
            </options>
            <options value="Level">
              {t("notifications-page.create.Level.title")}
            </options>
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
            isAllowed={values => {
              const { floatValue, formattedValue } = values;
              if (isProfit) {
                return (
                  formattedValue === "" ||
                  (floatValue > 0 && floatValue <= 1000)
                );
              }
              return (
                formattedValue === "" || (floatValue > 0 && floatValue <= 7)
              );
            }}
          />
          <div className="form-error">{this.props.errorMessage}</div>
          <div className="dialog__buttons">
            <GVButton
              color="primary"
              type="submit"
              disabled={!isValid || !dirty}
            >
              {t("buttons.create")}
            </GVButton>
          </div>
        </div>
      </form>
    );
  }
}

ProgramNotificationCreateForm.propTypes = {};

export default compose(
  translate(),
  withFormik({
    displayName: "create-notification",
    mapPropsToValues: () => ({
      type: "ProgramCondition",
      conditionType: "Profit",
      conditionAmount: ""
    }),
    validationSchema: ({ t }) =>
      object().shape({
        conditionAmount: number().required(
          t("notifications-page.create.amount-required")
        )
      }),
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(ProgramNotificationCreateForm);
