import "./muted-text.scss";

import classNames from "classnames";
import React from "react";

export const MutedText: React.FC<Props> = ({
  small,
  big,
  children,
  noWrap = true,
  bold
}) => {
  return (
    <span
      className={classNames("muted-text", {
        "muted-text--small": small,
        "muted-text--big": big,
        "muted-text--bold": bold,
        "muted-text--no-wrap": noWrap
      })}
    >
      {children}
    </span>
  );
};

interface Props {
  small?: boolean;
  big?: boolean;
  noWrap?: boolean;
  bold?: boolean;
}
