import "./form.scss";

import classNames from "classnames";
import * as React from "react";

interface IFormProps {
  className: string;
  id: string;
}

const Form: React.FC<IFormProps> = ({ className, children, ...props }) => {
  return (
    <form className={classNames("form", className)} {...props}>
      {children}
    </form>
  );
};

export default Form;
