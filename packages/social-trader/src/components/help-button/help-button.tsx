import "./help-button.scss";

import classNames from "classnames";
import * as React from "react";

const HelpButton: React.FC<OwnProps> = ({ muted, className, onClick }) => {
  return (
    <div
      className={classNames("help-button", className, {
        "help-button--muted": muted
      })}
      onClick={onClick}
    >
      ?
    </div>
  );
};

export default HelpButton;

interface OwnProps {
  muted?: boolean;
  onClick?: () => void;
  className?: string;
}
