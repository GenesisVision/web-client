import classNames from "classnames";
import * as React from "react";

import styles from "./form-error.module.scss";

export interface IFormErrorProps {
  small?: boolean;
  error?: string;
}

const FormError: React.FC<IFormErrorProps> = React.memo(({ error, small }) => {
  if (error) {
    return (
      <div
        className={classNames(styles["form-error"], {
          [styles["form-error--small"]]: small
        })}
      >
        {error}
      </div>
    );
  }
  return null;
});

export default FormError;
