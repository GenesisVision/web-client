import { withFormik, Field } from "formik";
import React from "react";
import Yup from "yup";

import DaysLeftWidget from "../../../../../components/days-left-widget/days-left-widget";
import FormError from "../../../../../shared/components/form/form-error/form-error";
import InputText from "../../../../../shared/components/form/input-text/input-text";
import PopupButtons from "../../../../popup/components/popup-buttons/popup-buttons";
import PopupHeader from "../../../../popup/components/popup-header/popup-header";
import TraderAvatar from "../../../../../components/trader-avatar/trader-avatar";

import "./trader-deposit.css";

const TraderDeposit = ({
  values,
  traderDeposit,
  isSubmitting,
  handleSubmit,
  closePopup,
  error
}) => {
  const calculateManagerCurrency = () => {
    return (values.amount * traderDeposit.gvtRate).toFixed(2);
  };
  return (
    <div className="popup">
      <PopupHeader header="Buy Tokens" onClose={closePopup} />
      <form id="programDepositForm" onSubmit={handleSubmit}>
        <div className="trader-deposit__info">
          <div className="trader-deposit__info-cell">
            <div className="trader-deposit__trader">
              <div className="trader-deposit__avatar">
                <TraderAvatar
                  imgUrl={traderDeposit.logo}
                  level={traderDeposit.level}
                />
              </div>
              <div className="trader-deposit__name">{traderDeposit.title}</div>
            </div>
          </div>
          <div className="trader-deposit__info-cell">
            <div className="trader-deposit__days-left">
              <DaysLeftWidget
                start={traderDeposit.startOfPeriod}
                duration={traderDeposit.periodDuration}
              />
            </div>
          </div>
          <div className="trader-deposit__info-cell trader-deposit__available">
            <div className="metric">
              <div className="metric__value">
                {traderDeposit.gvtWalletAmount}
              </div>
              <div className="metric__description">Available GVT</div>
            </div>
          </div>
        </div>
        <div className="trader-deposit__calculator">
          <div className="trader-deposit__calculator-cell input-gvt">
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
          <div className="trader-deposit__calculator-cell calculated-usd">
            <div className="metric">
              <div className="metric__value label-usd__value">
                {calculateManagerCurrency()}
              </div>
              <div className="metric__description">
                Amount in {traderDeposit.currency}
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
  displayName: "traderDepositForm",
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
})(TraderDeposit);
