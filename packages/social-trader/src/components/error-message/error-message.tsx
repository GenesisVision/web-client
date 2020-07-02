import clsx from "clsx";
import * as React from "react";

import styles from "./error-message.module.scss";

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
    className={clsx(styles["error-message"], className, {
      [styles["error-message--over"]]: type === MESSAGE_TYPES.OVER
    })}
  >
    {error}
  </span>
);

export default ErrorMessage;
