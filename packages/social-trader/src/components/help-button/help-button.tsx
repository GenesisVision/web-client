import "./help-button.scss";

import classNames from "classnames";
import * as React from "react";

const HelpButton: React.FC<OwnProps> = ({ className, onClick }) => {
  return (
    <div className={classNames("help-button", className)} onClick={onClick}>
      ?
    </div>
  );
};

export default HelpButton;

interface OwnProps {
  onClick?: () => void;
  className?: string;
}
