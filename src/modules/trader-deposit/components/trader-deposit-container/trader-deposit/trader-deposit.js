import { withFormik, Field } from "formik";
import React from "react";
import Yup from "yup";

import InputText from "../../../../../shared/components/form/input-text/input-text";
import PopupHeader from "../../../../popup/components/popup-header/popup-header";
import PopupButtons from "../../../../popup/components/popup-buttons/popup-buttons";

const TraderDepositModal = ({
  values,
  isOpen,
  traderDeposit,
  isSubmitting,
  handleSubmit,
  closeModal
}) => {
  return (
    <div className="popup">
      <PopupHeader header="Buy Tokens" onClose={closeModal} />
      <form onSubmit={handleSubmit}>
        image | name : days left
        <Field
          name="amount"
          type="number"
          placeholder="Amount"
          addon="fas fa-barcode"
          component={InputText}
        />
        amount in usd
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
