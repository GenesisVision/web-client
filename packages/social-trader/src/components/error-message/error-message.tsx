import "./error-message.scss";

import classNames from "classnames";
import * as React from "react";

export enum MESSAGE_TYPES {
  DEFAULT = "DEFAULT",
  OVER = "OVER"
}
interface IErrorMessage {
  error: string | string[];
  type?: MESSAGE_TYPES;
  className?: string;
}
const ErrorMessage: React.FC<IErrorMessage> = ({ error, className, type }) => (
  <span
    className={classNames("error-message", className, {
      "error-message--over": type === MESSAGE_TYPES.OVER
    })}
  >
    {error}
  </span>
);

export default ErrorMessage;
