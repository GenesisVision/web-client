import clsx from "clsx";
import React from "react";

import styles from "./button-icon.module.scss";

interface Props {
  className?: string;
  disabled?: boolean;
}

export const ButtonIcon: React.FC<Props> = ({
  children,
  disabled,
  className
}) => {
  return (
    <div
      className={clsx(styles["button-icon"], className, {
        [styles["button-icon--disabled"]]: disabled
      })}
    >
      {children}
    </div>
  );
};
