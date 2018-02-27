import React from "react";

const FormError = ({ error }) => (
  <span className="text-danger">{error && <strong>{error}</strong>}</span>
);

export default FormError;
