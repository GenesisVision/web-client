import clsx from "clsx";
import * as React from "react";
import { OptionalClickable } from "utils/types";

import styles from "./help-button.module.scss";

const HelpButton: React.FC<Props> = ({ muted, className, onClick }) => {
  return (
    <div
      className={clsx(styles["help-button"], className, {
        [styles["help-button--muted"]]: muted
      })}
      onClick={onClick}
    >
      ?
    </div>
  );
};

export default HelpButton;

interface Props extends OptionalClickable {
  muted?: boolean;
  className?: string;
}
