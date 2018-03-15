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

const TraderDepositModal = ({
  values,
  isOpen,
  traderDeposit,
  isSubmitting,
  handleSubmit,
  closeModal,
  error
}) => {
  const calculateUsd = () => {
    return (values.amount * traderDeposit.gvtUsdRate).toFixed(2);
  };
  return (
    <div className="popup">
      <PopupHeader header="Buy Tokens" onClose={closeModal} />
      <form onSubmit={handleSubmit}>
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
          <div className="trader-deposit__info-cell">
            <div className="quantitative-characteristic">
              <div className="quantitative-characteristic__value">
                {traderDeposit.gvtWalletAmount}
              </div>
              <div className="quantitative-characteristic__description">
                Avaialble GVT
              </div>
            </div>
          </div>
        </div>
        <div className="trader-deposit__calculator">
          <div className="trader-deposit__calculator-cell input-gvt">
            <div className="input-gvt__value">
              <Field
                name="amount"
                type="number"
                placeholder=""
                controllClass="input-gvt__amount"
                component={InputText}
              />
            </div>
            <div className="input-gvt__description">Enter GVT amount</div>
          </div>
          <div className="trader-deposit__calculator-cell calculated-usd">
            <div className="quantitative-characteristic">
              <div className="quantitative-characteristic__value label-usd__value">
                {calculateUsd()}
              </div>
              <div className="quantitative-characteristic__description">
                Amount in USD
              </div>
            </div>
          </div>
        </div>

        <FormError error={error} />
        <PopupButtons
          submitLabel="Buy Tokens"
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={closeModal}
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
    props.onSubmit(values, setSubmitting);
  }
})(TraderDepositModal);
