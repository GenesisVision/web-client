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
import React, { Component } from "react";

const TraderDepositModal = ({
  isOpen,
  availableTokens,
  availableInvestments,
  buyTokens,
  toggleModal
}) => {
  return (
    <form>
      <Modal isOpen={isOpen}>
        <ModalHeader>Investing</ModalHeader>
        <ModalBody>
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
            <Col sm={4}>
              <Input
                type="number"
                id="buyTokens"
                value={0}
                onChange={buyTokens}
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
          <Button color="outline-secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </form>
  );
};

export default TraderDepositModal;
