import classNames from "classnames";
import * as React from "react";

import styles from "./help-button.module.scss";

const HelpButton: React.FC<OwnProps> = ({ muted, className, onClick }) => {
  return (
    <div
      className={classNames(styles["help-button"], className, {
        [styles["help-button--muted"]]: muted
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
