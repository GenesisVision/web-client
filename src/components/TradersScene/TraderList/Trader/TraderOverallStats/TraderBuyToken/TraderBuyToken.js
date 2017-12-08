import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import TraderBuyModal from './TraderBuyModal/TraderBuyModal'
import {buyToken} from '../../../../../../actions';


class TraderBuyToken extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    tokens: PropTypes.number.isRequired
  };

  state = {
    isModalOpen: false
  };

  buyTokens = (tokens) => {
    this.props.dispatch(buyToken(this.props.id, tokens));
    this.toggleModal();
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return (
      <div>
        <Button color='outline-success' onClick={this.toggleModal}>Buy</Button>
        <TraderBuyModal tokens={this.props.tokens} isOpen={this.state.isModalOpen} buyTokens={this.buyTokens} toggleModal={this.toggleModal} />
      </div>
    );
  }
}

TraderBuyToken = connect()(TraderBuyToken);

export default TraderBuyToken;