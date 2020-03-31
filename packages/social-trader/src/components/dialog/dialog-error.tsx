import FormError, {
  IFormErrorProps
} from "components/form/form-error/form-error";
import * as React from "react";

export const _DialogError: React.FC<IFormErrorProps> = ({ error }) => (
  <div className="dialog__error">
    <FormError error={error} />
  </div>
);

export const DialogError = React.memo(_DialogError);
