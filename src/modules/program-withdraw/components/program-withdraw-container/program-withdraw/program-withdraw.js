import { withFormik, Field } from "formik";
import React from "react";
import Yup from "yup";

import DaysLeftWidget from "../../../../../components/days-left-widget/days-left-widget";
import FormError from "../../../../../shared/components/form/form-error/form-error";
import InputText from "../../../../../shared/components/form/input-text/input-text";
import PopupButtons from "../../../../popup/components/popup-buttons/popup-buttons";
import PopupHeader from "../../../../popup/components/popup-header/popup-header";
import ProgramAvatar from "../../../../../components/program-avatar/program-avatar";

import "./program-withdraw.css";

const TraderWithdraw = ({
  values,
  programWithdraw,
  handleSubmit,
  closePopup,
  error,
  isSubmitting,
  setFieldValue
}) => {
  const handleWithdrawAll = () => {
    setFieldValue("amount", programWithdraw.investedTokens);
  };
  return (
    <div className="popup">
      <PopupHeader header="Sell Tokens" onClose={closePopup} />
      <form id="programWithdrawForm" onSubmit={handleSubmit}>
        <div className="program-withdraw__info">
          <div className="program-withdraw__info-cell">
            <div className="program-withdraw__trader">
              <div className="program-withdraw__avatar">
                <ProgramAvatar
                  imgUrl={programWithdraw.logo}
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
              <div className="metric__value">
                {programWithdraw.investedTokens}
              </div>
              <div className="metric__description">
                Invested {programWithdraw.token.tokenSymbol}
              </div>
            </div>
          </div>
        </div>
        <div className="program-withdraw__calculator">
          <div className="program-withdraw__calculator-header">
            How much would you like to withdraw?
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
              Enter {programWithdraw.token.tokenSymbol} amount
            </div>
          </div>
          <div>
            <span className="link" onClick={handleWithdrawAll}>
              Withdraw all invested tokens
            </span>
          </div>
        </div>

        <FormError error={error} />
        <PopupButtons
          submitLabel="Sell Tokens"
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
  validationSchema: Yup.object().shape({
    amount: Yup.number()
      .typeError("Amount must be a number.")
      .moreThan(0, "Amount must be greater than zero")
      .required("Amount is required.")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.submitPopup(values, setSubmitting);
  }
})(TraderWithdraw);
