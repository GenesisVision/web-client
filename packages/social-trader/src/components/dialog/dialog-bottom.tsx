import "./dialog.scss";

import classNames from "classnames";
import * as React from "react";

export const _DialogBottom: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children
}) => <div className={classNames("dialog__bottom", className)}>{children}</div>;

export const DialogBottom = React.memo(_DialogBottom);
