import classNames from "classnames";
import { MutedText } from "components/muted-text/muted-text";
import * as React from "react";

import "./form-text-field.scss";

const _FormTextField: React.FC<Props> = ({ children, accent }) => {
  return (
    <div
      className={classNames("form-text-field__text", {
        "form-text-field__text--color-accent": accent
      })}
    >
      <MutedText noWrap={false}>{children}</MutedText>
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  accent?: boolean;
}

const FormTextField = React.memo(_FormTextField);
export default FormTextField;
