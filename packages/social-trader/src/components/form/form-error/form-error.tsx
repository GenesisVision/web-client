import "./form-error.scss";

import * as React from "react";

export interface IFormErrorProps {
  error?: string;
}

const FormError: React.FC<IFormErrorProps> = React.memo(({ error }) => {
  if (error) {
    return <div className="form-error">{error}</div>;
  }
  return null;
});

export default FormError;
