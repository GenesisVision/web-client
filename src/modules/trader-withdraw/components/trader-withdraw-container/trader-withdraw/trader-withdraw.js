import { withFormik, Field } from "formik";
import React from "react";
import Yup from "yup";

import DaysLeftWidget from "../../../../../components/days-left-widget/days-left-widget";
import FormError from "../../../../../shared/components/form/form-error/form-error";
import InputText from "../../../../../shared/components/form/input-text/input-text";
import PopupButtons from "../../../../popup/components/popup-buttons/popup-buttons";
import PopupHeader from "../../../../popup/components/popup-header/popup-header";
import TraderAvatar from "../../../../../components/trader-avatar/trader-avatar";

import "./trader-withdraw.css";

const TraderWithdraw = ({
  values,
  traderWithdraw,
  handleSubmit,
  closePopup,
  error,
  isSubmitting,
  setFieldValue
}) => {
  const handleWithdrawAll = () => {
    setFieldValue("amount", traderWithdraw.investedTokens);
  };
  return (
    <div className="popup">
      <PopupHeader header="Sell Tokens" onClose={closePopup} />
      <form id="programWithdrawForm" onSubmit={handleSubmit}>
        <div className="trader-withdraw__info">
          <div className="trader-withdraw__info-cell">
            <div className="trader-withdraw__trader">
              <div className="trader-withdraw__avatar">
                <TraderAvatar
                  imgUrl={traderWithdraw.logo}
                  level={traderWithdraw.level}
                />
              </div>
              <div className="trader-withdraw__name">
                {traderWithdraw.title}
              </div>
            </div>
          </div>
          <div className="trader-withdraw__info-cell">
            <div className="trader-withdraw__days-left">
              <DaysLeftWidget
                start={traderWithdraw.startOfPeriod}
                duration={traderWithdraw.periodDuration}
              />
            </div>
          </div>
          <div className="trader-withdraw__info-cell">
            <div className="metric">
              <div className="metric__value">
                {traderWithdraw.investedTokens}
              </div>
              <div className="metric__description">
                Invested {traderWithdraw.token.tokenSymbol}
              </div>
            </div>
          </div>
        </div>
        <div className="trader-withdraw__calculator">
          <div className="trader-withdraw__calculator-header">
            How much would you like to withdraw?
          </div>
          <div className="trader-withdraw__calculator-cell input-token">
            <div className="input-gvt__token">
              <Field
                name="amount"
                type="number"
                placeholder=""
                controllClass="input-token__amount"
                component={InputText}
              />
            </div>
            <div className="input-token__description">
              Enter {traderWithdraw.token.tokenSymbol} amount
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
  displayName: "traderWithdrawForm",
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
})(TraderWithdraw);
