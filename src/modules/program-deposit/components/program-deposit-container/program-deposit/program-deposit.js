import { translate } from "react-i18next";
import { withFormik, Field } from "formik";
import NumberFormat from "react-number-format";
import React from "react";
import { object as yupObject, number as yupNumber } from "yup";

import FormError from "../../../../../shared/components/form/form-error/form-error";
import InputText from "../../../../../shared/components/form/input-text/input-text";
import PopupButtons from "../../../../popup/components/popup-buttons/popup-buttons";
import PopupHeader from "../../../../popup/components/popup-header/popup-header";
import ProgramAvatar from "../../../../../components/program-avatar/program-avatar";

import "./program-deposit.css";

const ProgramDeposit = ({
  t,
  values,
  programDeposit,
  isSubmitting,
  handleSubmit,
  closePopup,
  error
}) => {
  const calculateManagerCurrency = () => {
    return ((+values.amount || 0) * programDeposit.gvtRate).toFixed(2);
  };
  return (
    <div className="popup">
      <PopupHeader header={t("program-deposit.header")} onClose={closePopup} />
      <form id="programDepositForm" onSubmit={handleSubmit}>
        <div className="program-deposit__info">
          <div className="program-deposit__info-cell">
            <div className="program-deposit__trader">
              <div className="program-deposit__avatar">
                <ProgramAvatar
                  url={programDeposit.logo}
                  level={programDeposit.level}
                />
              </div>
              <div className="program-deposit__name">
                {programDeposit.title}
              </div>
            </div>
          </div>
          <div className="program-deposit__info-cell">
            <div className="metric">
              <div className="metric__value">
                <NumberFormat
                  value={programDeposit.availableInvestments}
                  decimalScale={4}
                  displayType="text"
                />
                <div className="metric__bubble">GVT</div>
              </div>
              <div className="metric__description">
                {t("program-deposit.available-to-invest")}
              </div>
            </div>
          </div>
          <div className="program-deposit__info-cell program-deposit__available">
            <div className="metric">
              <div className="metric__value">
                <NumberFormat
                  value={programDeposit.gvtWalletAmount}
                  decimalScale={4}
                  displayType="text"
                />
                <div className="metric__bubble">GVT</div>
              </div>
              <div className="metric__description">
                {t("program-deposit.your-gvt")}
              </div>
            </div>
          </div>
        </div>
        <div className="program-deposit__calculator">
          <div className="program-deposit__calculator-cell input-gvt">
            <div className="input-gvt__value">
              <Field
                number
                name="amount"
                placeholder="0"
                controllClass="input-gvt__amount"
                component={InputText}
                decimalScale={2}
                allowNegative={false}
              />
            </div>
            <div className="input-gvt__description">
              {t("program-deposit.enter-gvt-amount")}
            </div>
          </div>
          <div className="program-deposit__calculator-cell calculated-usd">
            <div className="metric">
              <div className="metric__value label-usd__value">
                {calculateManagerCurrency()}
              </div>
              <div className="metric__description">
                {t("program-deposit.amount-in")} {programDeposit.currency}
              </div>
            </div>
          </div>
        </div>
        <div className="program-deposit__notification">
          {t("program-deposit.notification")}
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
    amount: ""
  }),
  validationSchema: ({
    programDeposit: { gvtWalletAmount, availableInvestments }
  }) => {
    const maxVal = Math.min(gvtWalletAmount, availableInvestments);
    const maxValText =
      gvtWalletAmount < availableInvestments
        ? "Available GVT"
        : "Available To Invest";
    const scheme = yupObject().shape({
      amount: yupNumber()
        .typeError("Amount must be a number.")
        .moreThan(0, "Amount must be greater than zero")
        .max(maxVal, "Amount must not be greater than " + maxValText)
        .required("Amount is required.")
    });
    return scheme;
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    props.submitPopup(values, setSubmitting);
  }
})(translate()(ProgramDeposit));
