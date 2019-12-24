import "./help-button.scss";

import classnames from "classnames";
import GVButton from "components/gv-button";
import * as React from "react";

const HelpButton: React.FC<OwnProps> = ({ className, onClick }) => {
  return (
    <GVButton
      variant="text"
      type="button"
      color="secondary"
      className={classnames("help-button", className)}
      onClick={onClick}
    >
      ?
    </GVButton>
  );
};

export default HelpButton;

interface OwnProps {
  onClick?: () => void;
  className?: string;
}
