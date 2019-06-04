import "./form-error.scss";

import * as React from "react";

interface IFormErrorProps {
  error?: string;
}

const FormError: React.FC<IFormErrorProps> = ({ error }) => {
  if (error) {
    return <div className="form-error">{error}</div>;
  }
  return null;
};

export default FormError;
