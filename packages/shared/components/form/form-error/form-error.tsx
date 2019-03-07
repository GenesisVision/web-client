import "./form-error.scss";

import * as React from "react";

interface IFormErrorProps {
  error: string;
}

const FormError: React.FC<IFormErrorProps> = ({ error }) => (
  <div className="form-error">{error && error}</div>
);

export default FormError;
