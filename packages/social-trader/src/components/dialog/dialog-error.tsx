import FormError, {
  IFormErrorProps
} from "components/form/form-error/form-error";
import { Row } from "components/row/row";
import * as React from "react";

export const _DialogError: React.FC<IFormErrorProps> = ({ error }) => (
  <Row className="dialog__error">
    <FormError error={error} />
  </Row>
);

export const DialogError = React.memo(_DialogError);
