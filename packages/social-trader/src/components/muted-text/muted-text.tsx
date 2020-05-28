import classNames from "classnames";
import React from "react";

import styles from "./muted-text.module.scss";

export const MutedText: React.FC<Props> = ({
  className,
  small,
  big,
  children,
  noWrap = true,
  bold
}) => {
  return (
    <span
      className={classNames(
        styles["muted-text"],
        {
          [styles["muted-text--small"]]: small,
          [styles["muted-text--big"]]: big,
          [styles["muted-text--bold"]]: bold,
          [styles["muted-text--no-wrap"]]: noWrap
        },
        className
      )}
    >
      {children}
    </span>
  );
};

interface Props {
  className?: string;
  small?: boolean;
  big?: boolean;
  noWrap?: boolean;
  bold?: boolean;
}
