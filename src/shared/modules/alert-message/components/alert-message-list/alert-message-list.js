import { connect } from "react-redux";
import React, { Component } from "react";
import classnames from "classnames";
import "./alert-message-list.scss";
import { GVButton } from "gv-react-components";
import { alertMessageActions } from "../../actions/alert-message-actions";
import history from "../../../../../utils/history";
import { translate } from "react-i18next";

export class AlertMessageList extends Component {
  componentDidMount() {
    history.listen((location, action) => {
      this.props.clearAllMessages();
    });
  }

  render() {
    const { t, messages, removeMessage, clearAllMessages } = this.props;

    if (messages.length === 0) {
      return null;
    }

    const renderClearAllButton = messages.length > 1 && (
      <GVButton color="primary" onClick={clearAllMessages}>
        {t("alerts.clear-all")}
      </GVButton>
    );
    const messageComponents = messages.map(message => (
      <div
        key={message.id}
        className={classnames(
          "alert-message-list__alert-message",
          message.className
        )}
      >
        <div className="alert-message-list__text">{message.text}</div>
        <div
          className="alert-message-list__close"
          onClick={removeMessage(message.id)}
        >
          <div className="alert-message-list__close-button">+</div>
        </div>
      </div>
    ));

    return (
      <div className="alert-message-list">
        {messageComponents}
        {renderClearAllButton}
      </div>
    );
  }
}

export const mapStateToProps = state => {
  const messages = state.alertMessages;
  return { messages };
};

export const mapDispatchToProps = dispatch => ({
  removeMessage: id => () => {
    dispatch(alertMessageActions.remove(id));
  },
  clearAllMessages: () => {
    dispatch(alertMessageActions.clearAll());
  }
});

export default translate()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AlertMessageList)
);
