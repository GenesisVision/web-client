import "./form-error.scss";

import React from "react";

const FormError = ({ error }) => (
  <div className="form-error">{error && error}</div>
);

export default FormError;
