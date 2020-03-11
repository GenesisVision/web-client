import classNames from "classnames";
import * as React from "react";

export const DialogField: React.FC<{ hide?: boolean } & React.HTMLAttributes<
  HTMLDivElement
>> = ({ hide, children }) => (
  <div
    className={classNames("dialog__field", {
      "dialog__field--hidden": hide
    })}
  >
    {children}
  </div>
);
