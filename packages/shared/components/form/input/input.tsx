import "./input.scss";

import classNames from "classnames";
import * as React from "react";

interface IInputProps {
  className?: string;
}

const Input: React.FC<IInputProps> = ({ className, ...props }) => {
  return <input className={classNames("input", className)} {...props} />;
};

export default Input;
