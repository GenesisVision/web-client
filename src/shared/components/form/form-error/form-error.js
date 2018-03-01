import React from "react";

const FormError = ({ error }) => (
  <div className="text-danger">{error && <strong>{error}</strong>}</div>
);

export default FormError;
