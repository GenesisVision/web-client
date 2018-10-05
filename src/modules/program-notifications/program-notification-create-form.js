import Select from "components/select/select";
import { withFormik } from "formik";
import { GVButton, GVFormikField, GVTextField } from "gv-react-components";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";

class ProgramNotificationCreateForm extends Component {
  render() {
    const { t, program, handleSubmit } = this.props;
    return (
      <form id="create-notification" onSubmit={handleSubmit}>
        <div className="dialog__top">
          <div className="dialog__header">
            <h2>{t("notifications.program.create.title")}</h2>
            <p>{program.title}</p>
          </div>
          <GVFormikField
            name="conditionType"
            component={GVTextField}
            label={t("notifications.program.create.type-label")}
            InputComponent={Select}
          >
            <options value="Profit">
              {t("notifications.program.create.type-profit")}
            </options>
            <options value="Level">
              {t("notifications.program.create.type-level")}
            </options>
          </GVFormikField>
        </div>
        <div className="dialog__bottom">
          <GVFormikField
            name="conditionAmount"
            label={t("notifications.program.create.amount-label")}
            component={GVTextField}
            adornment="%"
            autoComplete="off"
            InputComponent={NumberFormat}
          />
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
    handleSubmit: (values, { props }) => props.onSubmit(values)
  })
)(ProgramNotificationCreateForm);
