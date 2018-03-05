import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Col,
  Input
} from "reactstrap";
import { withFormik, Field } from "formik";
import React, { Component } from "react";
import Yup from "yup";

import InputText from "../../../../../shared/components/form/input-text/input-text";

const TraderDepositModal = ({
  values,
  isOpen,
  traderDeposit,
  isSubmitting,
  handleSubmit,
  closeModal
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Modal isOpen={isOpen}>
        <ModalHeader>Buy Tokens</ModalHeader>
        <ModalBody>
          {/* <h2>{traderDeposit.name}</h2>
           <p>
            <span>Available GVT: </span>
            <span>{traderDeposit.available}</span>
          </p> */}
          <Field
            name="amount"
            type="number"
            placeholder="Amount"
            addon="fas fa-barcode"
            component={InputText}
          />
          {/* <p>
            <span>You'll get: </span>
            <span>{(values.amount || 0) * traderDeposit.rate} Tokens</span>
          </p> */}
        </ModalBody>
        <ModalFooter>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Buy
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
