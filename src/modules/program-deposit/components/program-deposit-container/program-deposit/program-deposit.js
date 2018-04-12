import { withFormik, Field } from "formik";
import React from "react";
import Yup from "yup";

import DaysLeftWidget from "../../../../../components/days-left-widget/days-left-widget";
import FormError from "../../../../../shared/components/form/form-error/form-error";
import InputText from "../../../../../shared/components/form/input-text/input-text";
import PopupButtons from "../../../../popup/components/popup-buttons/popup-buttons";
import PopupHeader from "../../../../popup/components/popup-header/popup-header";
import ProgramAvatar from "../../../../../components/program-avatar/program-avatar";

import "./program-deposit.css";

const ProgramDeposit = ({
  values,
  programDeposit,
  isSubmitting,
  handleSubmit,
  closePopup,
  error
}) => {
  const calculateManagerCurrency = () => {
    return (values.amount * programDeposit.gvtRate).toFixed(2);
  };
  return (
    <div className="popup">
      <PopupHeader header="Buy Tokens" onClose={closePopup} />
      <form id="programDepositForm" onSubmit={handleSubmit}>
        <div className="program-deposit__info">
          <div className="program-deposit__info-cell">
            <div className="program-deposit__trader">
              <div className="program-deposit__avatar">
                <ProgramAvatar
                  imgUrl={programDeposit.logo}
                  level={programDeposit.level}
                />
              </div>
              <div className="program-deposit__name">
                {programDeposit.title}
              </div>
            </div>
          </div>
          <div className="program-deposit__info-cell">
            <div className="program-deposit__days-left">
              <DaysLeftWidget
                start={programDeposit.startOfPeriod}
                duration={programDeposit.periodDuration}
              />
            </div>
          </div>
          <div className="program-deposit__info-cell program-deposit__available">
            <div className="metric">
              <div className="metric__value">
                {programDeposit.gvtWalletAmount}
              </div>
              <div className="metric__description">Available GVT</div>
            </div>
          </div>
        </div>
        <div className="program-deposit__calculator">
          <div className="program-deposit__calculator-cell input-gvt">
            <div className="input-gvt__value">
              <Field
                number
                name="amount"
                placeholder=""
                controllClass="input-gvt__amount"
                component={InputText}
                decimalScale={2}
              />
            </div>
            <div className="input-gvt__description">Enter GVT amount</div>
          </div>
          <div className="program-deposit__calculator-cell calculated-usd">
            <div className="metric">
              <div className="metric__value label-usd__value">
                {calculateManagerCurrency()}
              </div>
              <div className="metric__description">
                Amount in {programDeposit.currency}
              </div>
            </div>
          </div>
        </div>

        <FormError error={error} />
        <PopupButtons
          submitLabel="Buy Tokens"
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
  displayName: "programDepositForm",
  mapPropsToValues: () => ({
    amount: 0
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
})(ProgramDeposit);
