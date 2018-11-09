import Select from "components/select/select";
import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import { number, object } from "yup";

class FundNotificationCreateForm extends Component {
  render() {
    const { t, fund, handleSubmit, values } = this.props;
    const { conditionType } = values;
    const isProfit = conditionType === "Profit";
    return (
      <form id="create-notification" onSubmit={handleSubmit}>
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>{t("notifications.fund.create.title")}</h2>
            <p>{fund.title}</p>
          </div>
          <GVFormikField
            name="conditionType"
            component={GVTextField}
            label={t("notifications.fund.create.type-label")}
            InputComponent={Select}
          >
            <options value="Profit">
              {t("notifications.fund.create.Profit.title")}
            </options>
            <options value="Level">
              {t("notifications.fund.create.Level.title")}
            </options>
          </GVFormikField>
        </div>
        <div className="dialog__bottom">
          <GVFormikField
            name="conditionAmount"
            label={t("notifications.fund.create.amount-label")}
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
            <GVButton color="primary" type="submit">
              {t("buttons.create")}
            </GVButton>
          </div>
        </div>
      </form>
    );
  }
}

FundNotificationCreateForm.propTypes = {};

export default compose(
  translate(),
  withFormik({
    displayName: "create-notification",
    mapPropsToValues: () => ({
      type: "FundCondition",
      conditionType: "Profit",
      conditionAmount: ""
    }),
    validationSchema: ({ t }) =>
      object().shape({
        conditionAmount: number().required(
          t("notifications.fund.create.amount-required")
        )
      }),
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(FundNotificationCreateForm);
