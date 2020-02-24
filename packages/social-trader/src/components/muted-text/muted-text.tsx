import "./muted-text.scss";

import classNames from "classnames";
import React from "react";

export const MutedText: React.FC<Props> = ({
  children,
  noWrap = true,
  bold
}) => {
  return (
    <div
      className={classNames("muted-text", {
        "muted-text--bold": bold,
        "muted-text--no-wrap": noWrap
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  noWrap?: boolean;
  bold?: boolean;
}
