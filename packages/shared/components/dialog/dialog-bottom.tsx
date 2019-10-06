import "./dialog.scss";

import * as React from "react";

export const _DialogBottom: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <div className="dialog__bottom">{children}</div>;

export const DialogBottom = React.memo(_DialogBottom);
