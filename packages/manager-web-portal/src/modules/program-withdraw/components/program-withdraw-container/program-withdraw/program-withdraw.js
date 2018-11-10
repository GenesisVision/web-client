import "./program-withdraw.css";

import { Field, withFormik } from "formik";
import React from "react";
import { translate } from "react-i18next";
import { object, number } from "yup";

import DaysLeftWidget from "shared/components/days-left-widget/days-left-widget";
import TraderAvatar from "shared/components/program-avatar/program-avatar";
import FormError from "shared/components/form/form-error/form-error";
import InputText from "shared/components/form/input-text/input-text";
import PopupButtons from "../../../../popup/components/popup-buttons/popup-buttons";
import PopupHeader from "../../../../popup/components/popup-header/popup-header";

const ProgramWithdraw = ({
  t,
  values,
  programWithdraw,
  handleSubmit,
  closePopup,
  error,
  isSubmitting
}) => {
  return (
    <div className="popup">
      <PopupHeader header={t("withdraw-program.header")} onClose={closePopup} />
      <form id="programWithdrawForm" onSubmit={handleSubmit}>
        <div className="program-withdraw__info">
          <div className="program-withdraw__info-cell">
            <div className="program-withdraw__trader">
              <div className="trader-withdraw__avatar">
                <TraderAvatar
                  url={programWithdraw.logoSrc}
                  level={programWithdraw.level}
                />
              </div>
              <div className="program-withdraw__name">
                {programWithdraw.title}
              </div>
            </div>
          </div>
          <div className="program-withdraw__info-cell">
            <div className="program-withdraw__days-left">
              <DaysLeftWidget
                start={programWithdraw.startOfPeriod}
                duration={programWithdraw.periodDuration}
              />
            </div>
          </div>
          <div className="program-withdraw__info-cell">
            <div className="metric">
              <div className="metric__value">{programWithdraw.ownBalance}</div>
              <div className="metric__description">
                {t("withdraw-program.your-balance")} {programWithdraw.currency}
              </div>
            </div>
          </div>
        </div>
        <div className="program-withdraw__calculator">
          <div className="program-withdraw__calculator-header">
            {t("withdraw-program.how-much-withdraw")}
          </div>
          <div className="program-withdraw__calculator-cell input-token">
            <div className="input-gvt__token">
              <Field
                name="amount"
                type="number"
                placeholder="0"
                controllClass="input-token__amount"
                component={InputText}
                allowNegative={false}
              />
            </div>
            <div className="input-token__description">
              {t("withdraw-program.enter-amount", {
                currency: programWithdraw.currency
              })}
            </div>
          </div>
          <div>
            <span>
              {t("withdraw-program.minimal-balance")} $
              {programWithdraw.minAccountBalanceUsd} (
              {programWithdraw.minAccountBalance} {programWithdraw.currency})
            </span>
          </div>
        </div>

        <FormError error={error} />
        <PopupButtons
          submitLabel="Withdraw"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={closePopup}
          submitButtonId="programWithdrawSubmit"
        />
      </form>
    </div>
  );
};

export default withFormik({
  displayName: "programWithdrawForm",
  mapPropsToValues: () => ({
    amount: ""
  }),
  validationSchema: object().shape({
    amount: number()
      .typeError("Amount must be a number.")
      .moreThan(0, "Amount must be greater than zero")
      .required("Amount is required.")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.submitPopup(values, setSubmitting);
  }
})(translate()(ProgramWithdraw));
