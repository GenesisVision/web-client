import "./help-button.scss";

import classnames from "classnames";
import * as React from "react";
import GVButton from "shared/components/gv-button";

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
  onClick(): void;
  className?: string;
}
