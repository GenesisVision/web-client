import "./form-error.scss";

import classNames from "classnames";
import * as React from "react";

export interface IFormErrorProps {
  small?: boolean;
  error?: string;
}

const FormError: React.FC<IFormErrorProps> = React.memo(({ error, small }) => {
  if (error) {
    return (
      <div className={classNames("form-error", { "form-error--small": small })}>
        {error}
      </div>
    );
  }
  return null;
});

export default FormError;
