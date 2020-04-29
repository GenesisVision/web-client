import classNames from "classnames";
import { MutedText } from "components/muted-text/muted-text";
import * as React from "react";

import "./form-text-field.scss";

const _FormTextField: React.FC<Props> = ({ children, topPadding, accent }) => {
  return (
    <div className="form-text-field__container">
      <p
        className={classNames("form-text-field__text", {
          "form-text-field__text--padding-top": topPadding,
          "form-text-field__text--color-accent": accent
        })}
      >
        <MutedText noWrap={false}>{children}</MutedText>
      </p>
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  topPadding?: boolean;
  accent?: boolean;
}

const FormTextField = React.memo(_FormTextField);
export default FormTextField;
