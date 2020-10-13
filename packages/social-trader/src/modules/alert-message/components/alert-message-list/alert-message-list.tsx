import { Button } from "components/button/button";
import AlertMessage from "modules/alert-message/components/alert-message-list/alert-message";
import Router from "next/router";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers/root-reducer";
import styled from "styled-components";
import { $paddingSmall } from "utils/style/sizes";

import { alertMessageActions } from "../../actions/alert-message-actions";

export const CLEAR_ALL_ALERTS_ID = "CLEAR_ALL_ALERTS_ID";

const List = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  padding: ${$paddingSmall / 2}px;
  z-index: 9999;
  pointer-events: none;

  * {
    pointer-events: visible;
  }
`;

const _AlertMessageList: React.FC = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const messages = useSelector((state: RootState) => state.alertMessages);
  const removeMessage = useCallback(id => {
    dispatch(alertMessageActions.remove(id));
  }, []);
  const clearAllMessages = useCallback(() => {
    dispatch(alertMessageActions.clearAll());
  }, []);

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
    <AlertMessage key={message.id} message={message} onClick={removeMessage} />
  ));

  if (messages.length > 1) {
    children.push(
      <Button
        testId={CLEAR_ALL_ALERTS_ID}
        color="primary"
        onClick={clearAllMessages}
      >
        {t("alerts.clear-all")}
      </Button>
    );
  }

  return <List>{children}</List>;
};

const AlertMessageList = React.memo(_AlertMessageList);
export default AlertMessageList;
