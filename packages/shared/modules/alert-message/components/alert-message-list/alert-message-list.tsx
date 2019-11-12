import "./alert-message-list.scss";

import Router from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import posed, { PoseGroup } from "react-pose";
import { connect } from "react-redux";
import { compose, Dispatch } from "redux";
import GVButton from "shared/components/gv-button";
import AlertMessage from "shared/modules/alert-message/components/alert-message-list/alert-message";
import { ActionType } from "shared/utils/types";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

import { alertMessageActions } from "../../actions/alert-message-actions";
import { AlertMessagesState } from "../../reducers/alert-message-reducers";

const AlertBox = posed.div({
  enter: {
    x: "0%"
  },
  exit: {
    x: "100%"
  }
});

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
    <AlertBox key={message.id}>
      <AlertMessage message={message} onClick={removeMessage} />
    </AlertBox>
  ));

  if (messages.length > 1) {
    children.push(
      <AlertBox key={"delete-button"}>
        <GVButton color="primary" onClick={clearAllMessages}>
          {t("alerts.clear-all")}
        </GVButton>
      </AlertBox>
    );
  }

  return (
    <div className="alert-message-list">
      <PoseGroup animateOnMount>{children}</PoseGroup>
    </div>
  );
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
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
