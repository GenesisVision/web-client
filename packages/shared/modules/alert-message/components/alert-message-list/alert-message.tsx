import classNames from "classnames";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import { IMessage } from "../../reducers/alert-message-reducers";

interface IAlertMessageProps {
  onClick(id: string): void;
  message: IMessage;
}

class AlertMessage extends React.PureComponent<
  IAlertMessageProps & InjectedTranslateProps
> {
  handleClick = () => {
    this.props.onClick(this.props.message.id);
  };

  getMessageText = ({
    text,
    isUseLocalization
  }: {
    text: string;
    isUseLocalization: boolean;
  }): string => {
    let result = text;

    if (isUseLocalization) {
      result = this.props.t(text);
    }
    return result;
  };

  render() {
    const { message } = this.props;
    return (
      <div className={classNames("alert-message", message.className)}>
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

export default translate()(AlertMessage);
