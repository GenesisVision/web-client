import classNames from "classnames";
import React, { useCallback } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import { IMessage } from "../../reducers/alert-message-reducers";

const _AlertMessage: React.FC<Props & InjectedTranslateProps> = ({
  message,
  t,
  onClick
}) => {
  const handleClick = useCallback(() => onClick(message.id), [
    onClick,
    message
  ]);

  const getMessageText = useCallback(
    ({
      text,
      isUseLocalization
    }: {
      text: string;
      isUseLocalization: boolean;
    }): string => (isUseLocalization && t(text)) || text,
    [t]
  );

  return (
    <div className={classNames("alert-message", message.className)}>
      <div className="alert-message-list__text">{getMessageText(message)}</div>
      <div className="alert-message-list__close" onClick={handleClick}>
        <div className="alert-message-list__close-button">+</div>
      </div>
    </div>
  );
};

interface Props {
  onClick(id: string): void;
  message: IMessage;
}

const AlertMessage = translate()(React.memo(_AlertMessage));
export default AlertMessage;
