import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { withFormik, Field } from "formik";
import React from "react";
import Yup from "yup";

import FormError from "../../../../../shared/components/form/form-error/form-error";
import InputText from "../../../../../shared/components/form/input-text/input-text";

const TraderWithdrawModal = ({
  values,
  setFieldValue,
  isOpen,
  traderWithdraw,
  error,
  isSubmitting,
  handleSubmit,
  closeModal
}) => {
  /*const handleWithdrawAll = () => {
    setFieldValue("amount", traderWithdraw.available);
  };*/
  return (
    <form onSubmit={handleSubmit}>
      <Modal isOpen={isOpen}>
        <ModalHeader>Sell Tokens</ModalHeader>
        <ModalBody>
          {/* <h2>{traderWithdraw.name}</h2>
          <p>
            <span>Available funds: </span>
            <span>{traderWithdraw.available} Tokens</span>
            <button
              type="submit"
              className="btn ml-2"
              onClick={handleWithdrawAll}
            >
              Withdraw all available funds
            </button>
          </p> */}
          <p>How much would you like to withdraw?</p>
          <Field
            name="amount"
            type="number"
            placeholder="Amount"
            addon="fas fa-barcode"
            component={InputText}
          />
          {/* <p>
            <span>Equivalent: </span>
            <span>{(values.amount || 0) * traderWithdraw.rate} GVT</span>
          </p> */}
          <FormError error={error} />
        </ModalBody>
        <ModalFooter>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Sell
          </button>
          <Button color="outline-secondary" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </form>
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
    props.onSubmit(values, setSubmitting);
  }
})(TraderWithdrawModal);
