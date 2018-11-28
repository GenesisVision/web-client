import React, { Component } from "react";
import PropTypes from "prop-types";
import posed from "react-pose";
import classnames from "classnames";
import { translate } from "react-i18next";

class AlertMessage extends Component {
  handleClick = () => {
    this.props.onClick(this.props.message.id);
  };

  getMessageText = ({ text, isUseLocalization }) => {
    let result = text;

    if (isUseLocalization) {
      result = this.props.t(text);
    }
    return result;
  };

  render() {
    const { message } = this.props;
    return (
      <div className={classnames("alert-message", message.className)}>
        <div className="alert-message-list__text">
          {this.getMessageText(message)}
        </div>
        <div className="alert-message-list__close" onClick={this.handleClick}>
          <div className="alert-message-list__close-button">+</div>
        </div>
      </div>
    );
  }
}

AlertMessage.propTypes = {};

export default translate()(AlertMessage);
