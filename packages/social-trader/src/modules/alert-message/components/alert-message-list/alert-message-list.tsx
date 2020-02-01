import "./alert-message-list.scss";

import GVButton from "components/gv-button";
import AlertMessage from "modules/alert-message/components/alert-message-list/alert-message";
import Router from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { compose, Dispatch } from "redux";
import { ActionType } from "utils/types";

import { alertMessageActions } from "../../actions/alert-message-actions";
import { AlertMessagesState } from "../../reducers/alert-message-reducers";

export const CLEAR_ALL_ALERTS_ID = "CLEAR_ALL_ALERTS_ID";

const _AlertMessageList: React.FC<Props> = props => {
  const { t } = useTranslation();
  const { messages, removeMessage, clearAllMessages } = props;

  useEffect(() => {
    const handleChange = () => {
      clearAllMessages();
    };
    Router.events.on("routeChangeStart", handleChange);
    return () => {
      Router.events.off("routeChangeStart", handleChange);
    };
  }, []);

  const children = messages.map(message => (
    <AlertMessage message={message} onClick={removeMessage} />
  ));

  if (messages.length > 1) {
    children.push(
      <GVButton
        testId={CLEAR_ALL_ALERTS_ID}
        color="primary"
        onClick={clearAllMessages}
      >
        {t("alerts.clear-all")}
      </GVButton>
    );
  }

  return <div className="alert-message-list">{children}</div>;
};

const mapStateToProps = (state: RootState): StateProps => {
  const messages = state.alertMessages;
  return { messages };
};

const mapDispatchToProps = (dispatch: Dispatch<ActionType>): DispatchProps => ({
  removeMessage: id => {
    dispatch(alertMessageActions.remove(id));
  },
  clearAllMessages: () => {
    dispatch(alertMessageActions.clearAll());
  }
});

const AlertMessageList = compose<React.FC>(
  connect(mapStateToProps, mapDispatchToProps),
  React.memo
)(_AlertMessageList);

export default AlertMessageList;

interface StateProps {
  messages: AlertMessagesState;
}

interface DispatchProps {
  removeMessage(id: string): void;
  clearAllMessages(): void;
}

interface Props extends StateProps, DispatchProps {}
