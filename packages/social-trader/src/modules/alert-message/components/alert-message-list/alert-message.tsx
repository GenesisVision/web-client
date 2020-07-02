import clsx from "clsx";
import { ALERT_MESSAGE } from "modules/alert-message/actions/alert-message-actions.constants";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { IMessage } from "../../reducers/alert-message-reducers";
import styles from "./alert-message-list.module.scss";

export const ALERT_CLOSE_CLASS = "alert-message-list__close";
export const ALERT_TEXT_CLASS = "alert-message-list__text";

const _AlertMessage: React.FC<Props> = ({ message, onClick }) => {
  const { t } = useTranslation();
  const handleClick = useCallback(() => onClick(message.id!), [
    onClick,
    message
  ]);

  const getMessageText = useCallback(
    ({
      text = "",
      isUseLocalization
    }: {
      text?: string;
      isUseLocalization?: boolean;
    }): string => (isUseLocalization && t(text)) || text,
    [t]
  );

  return (
    <div
      className={clsx(styles["alert-message"], {
        [styles["alert-message--success"]]:
          message.type === ALERT_MESSAGE.SUCCESS,
        [styles["alert-message--error"]]: message.type === ALERT_MESSAGE.ERROR,
        [styles["alert-message--warning"]]:
          message.type === ALERT_MESSAGE.WARNING
      })}
    >
      <div className={styles[ALERT_TEXT_CLASS]}>{getMessageText(message)}</div>
      <div
        className={styles["alert-message-list__close"]}
        onClick={handleClick}
      >
        <div className={styles["alert-message-list__close-button"]}>+</div>
      </div>
    </div>
  );
};

interface Props {
  onClick(id: string): void;
  message: IMessage;
}

const AlertMessage = React.memo(_AlertMessage);
export default AlertMessage;
