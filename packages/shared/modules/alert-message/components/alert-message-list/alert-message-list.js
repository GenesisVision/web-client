import "./alert-message-list.scss";

import { GVButton } from "gv-react-components";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { connect } from "react-redux";

import history from "shared/utils/history";
import { alertMessageActions } from "../../actions/alert-message-actions";
import AlertMessage from "shared/modules/alert-message/components/alert-message-list/alert-message";
import posed, { PoseGroup } from "react-pose";

const AlertBox = posed.div({
  enter: {
    x: "0%"
  },
  exit: {
    x: "100%"
  }
});

export class AlertMessageList extends Component {
  componentDidMount() {
    history.listen((location, action) => {
      this.props.clearAllMessages();
    });
  }

  render() {
    const { t, messages, removeMessage, clearAllMessages } = this.props;

    const renderClearAllButton = messages.length > 1 && (
      <AlertBox key={"delete-button"}>
        <GVButton color="primary" onClick={clearAllMessages}>
          {t("alerts.clear-all")}
        </GVButton>
      </AlertBox>
    );

    return (
      <div className="alert-message-list">
        <PoseGroup animateOnMount>
          {messages.map(message => (
            <AlertBox key={message.id}>
              <AlertMessage message={message} onClick={removeMessage} />
            </AlertBox>
          ))}
          {renderClearAllButton}
        </PoseGroup>
      </div>
    );
  }
}

export const mapStateToProps = state => {
  const messages = state.alertMessages;
  return { messages };
};

export const mapDispatchToProps = dispatch => ({
  removeMessage: id => {
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
