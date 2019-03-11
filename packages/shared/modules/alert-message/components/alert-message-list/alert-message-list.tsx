import "./alert-message-list.scss";

import { GVButton } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import posed, { PoseGroup } from "react-pose";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import AlertMessage from "shared/modules/alert-message/components/alert-message-list/alert-message";
import RootState from "shared/reducers/root-reducer";
import history from "shared/utils/history";
import { ActionType } from "shared/utils/types";

import { alertMessageActions } from "../../actions/alert-message-actions";
import { AlertMessagesState } from "../../reducers/alert-message-reducers";

interface IAlertMessageListProps {}
interface IAlertMessageListStateProps {
  messages: AlertMessagesState;
}
interface IAlertMessageListDispatchProps {
  removeMessage(id: string): void;
  clearAllMessages(): void;
}

const AlertBox = posed.div({
  enter: {
    x: "0%"
  },
  exit: {
    x: "100%"
  }
});

export class AlertMessageList extends React.Component<
  IAlertMessageListProps &
    InjectedTranslateProps &
    IAlertMessageListStateProps &
    IAlertMessageListDispatchProps
> {
  componentDidMount() {
    history.listen(() => {
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

export const mapStateToProps = (
  state: RootState
): IAlertMessageListStateProps => {
  const messages = state.alertMessages;
  return { messages };
};

export const mapDispatchToProps = (
  dispatch: Dispatch<ActionType>
): IAlertMessageListDispatchProps => ({
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
