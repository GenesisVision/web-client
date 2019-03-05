import "./error-message.scss";

import classNames from "classnames";
import * as React from "react";

export const DEFAULT = "DEFAULT";
export const OVER = "OVER";

export enum MESSAGE_TYPES {
  DEFAULT = "DEFAULT",
  OVER = "OVER"
}
interface IErrorMessage {
  error: string;
  className: string;
  type: MESSAGE_TYPES;
}
const ErrorMessage: React.FC<IErrorMessage> = ({ error, className, type }) => {
  return (
    <div
      className={classNames("error-message", className, {
        "error-message--over": type === OVER
      })}
    >
      {error}
    </div>
  );
};

export default ErrorMessage;
