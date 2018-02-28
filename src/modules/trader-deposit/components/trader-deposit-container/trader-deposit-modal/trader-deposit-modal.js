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
  isOpen,
  availableTokens,
  availableInvestments,
  buyTokens,
  closeModal
}) => {
  return (
    <form>
      <Modal isOpen={isOpen}>
        <ModalHeader>Buy Tokens</ModalHeader>
        <ModalBody>
          <p>Program A</p>
          <FormGroup row>
            <Label for="availToken" sm={4}>
              Available Tokens
            </Label>
            <Col sm={8}>{availableInvestments}</Col>
          </FormGroup>
          <FormGroup row>
            <Label for="buyTokens" sm={4}>
              Buy Tokens
            </Label>
            <Col sm={8}>
              <Field
                name="amount"
                placeholder="Amount"
                addon="fas fa-barcode"
                component={InputText}
                autoFocus
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="costToken" sm={4}>
              Cost (GVT)
            </Label>
            <Col sm={8}>100</Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="outline-success" onClick={buyTokens}>
            Buy
          </Button>
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
