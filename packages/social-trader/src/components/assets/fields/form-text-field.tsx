import "./fields.scss";

import classNames from "classnames";
import * as React from "react";

const _FormTextField: React.FC<Props> = ({ children, topPadding, accent }) => {
  return (
    <p
      className={classNames("form-text-field", {
        "form-text-field--padding-top": topPadding,
        "form-text-field--color-accent": accent
      })}
    >
      {children}
    </p>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  topPadding?: boolean;
  accent?: boolean;
}

const FormTextField = React.memo(_FormTextField);
export default FormTextField;
