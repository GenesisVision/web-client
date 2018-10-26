import "./fund-withdraw.scss";

import { Field, withFormik } from "formik";
import React from "react";
import { translate } from "react-i18next";
import Yup from "yup";

import DaysLeftWidget from "components/days-left-widget/days-left-widget";
import TraderAvatar from "components/program-avatar/program-avatar";
import FormError from "shared/components/form/form-error/form-error";
import InputText from "shared/components/form/input-text/input-text";
import PopupButtons from "popup/components/popup-buttons/popup-buttons";
import PopupHeader from "popup/components/popup-header/popup-header";

const FundWithdraw = ({
  t,
  values,
  fundWithdraw,
  handleSubmit,
  closePopup,
  error,
  isSubmitting
}) => {
  return (
    <div className="popup">
      <PopupHeader header={t("fund-withdraw.header")} onClose={closePopup} />
      <form id="fundWithdrawForm" onSubmit={handleSubmit}>
        <div className="fund-withdraw__info">
          <div className="fund-withdraw__info-cell">
            <div className="fund-withdraw__trader">
              <div className="trader-withdraw__avatar">
                <TraderAvatar
                  url={fundWithdraw.logoSrc}
                  level={fundWithdraw.level}
                />
              </div>
              <div className="fund-withdraw__name">{fundWithdraw.title}</div>
            </div>
          </div>
          <div className="fund-withdraw__info-cell">
            <div className="fund-withdraw__days-left">
              <DaysLeftWidget
                start={fundWithdraw.startOfPeriod}
                duration={fundWithdraw.periodDuration}
              />
            </div>
          </div>
          <div className="fund-withdraw__info-cell">
            <div className="metric">
              <div className="metric__value">{fundWithdraw.ownBalance}</div>
              <div className="metric__description">
                {t("withdraw-fund.your-balance")} {fundWithdraw.currency}
              </div>
            </div>
          </div>
        </div>
        <div className="fund-withdraw__calculator">
          <div className="fund-withdraw__calculator-header">
            {t("withdraw-fund.how-much-withdraw")}
          </div>
          <div className="fund-withdraw__calculator-cell input-token">
            <div className="input-gvt__token">
              <Field
                name="percent"
                type="number"
                placeholder="0"
                controllClass="input-token__percent"
                component={InputText}
                allowNegative={false}
              />
            </div>
            <div className="input-token__description">
              {t("withdraw-fund.enter-percent", {
                currency: fundWithdraw.currency
              })}
            </div>
          </div>
          <div>
            <span>
              {t("withdraw-fund.minimal-balance")} $
              {fundWithdraw.minAccountBalanceUsd} (
              {fundWithdraw.minAccountBalance} {fundWithdraw.currency})
            </span>
          </div>
        </div>

        <FormError error={error} />
        <PopupButtons
          submitLabel="Withdraw"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={closePopup}
          submitButtonId="fundWithdrawSubmit"
        />
      </form>
    </div>
  );
};

export default withFormik({
  displayName: "fundWithdrawForm",
  mapPropsToValues: () => ({
    percent: ""
  }),
  validationSchema: Yup.object().shape({
    percent: Yup.number()
      .typeError("Amount must be a number.")
      .moreThan(0, "Amount must be greater than zero")
      .required("Amount is required.")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.submitPopup(values, setSubmitting);
  }
})(translate()(FundWithdraw));
