import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col, Input } from 'reactstrap'

class TraderBuyModal extends Component {
  state = {
    buyTokens: this.props.tokens
  }

  changeBuyTokens = (e) => {
    this.setState({
      buyTokens: e.target.value
    })
  }

  buyTokens = () => {
    this.props.buyTokens(this.state.buyTokens);
  }

  render() {
    return (
      <form>
        <Modal isOpen={this.props.isOpen}>
          <ModalHeader>Investing</ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Label for='availToken' sm={4}>Available Tokens</Label>
              <Col sm={8}>{this.props.tokens}</Col>
            </FormGroup>
            <FormGroup row>
              <Label for='buyTokens' sm={4}>Buy Tokens</Label>
              <Col sm={4}>
                <Input type='number' id='buyTokens' value={this.state.buyTokens} onChange={this.changeBuyTokens} autoFocus />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='costToken' sm={4}>Cost (GVT)</Label>
              <Col sm={8}>100</Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='outline-success' onClick={this.buyTokens}>Buy</Button>
            <Button color='outline-secondary' onClick={this.props.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </form>
    )
  }
}

TraderBuyModal.propTypes = {
  tokens: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  buyTokens: PropTypes.func.isRequired
}

export default TraderBuyModal;