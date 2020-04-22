import classNames from "classnames";
import React from "react";

import "./colored-text.scss";

export type ColoredTextColor = "red" | "green";

interface Props {
  color?: ColoredTextColor;
}

export const ColoredText: React.FC<Props> = ({ color, children }) => {
  return (
    <span
      className={classNames("colored-text", {
        "colored-text--green": color === "green",
        "colored-text--red": color === "red"
      })}
    >
      {children}
    </span>
  );
};
