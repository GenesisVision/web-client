import "./dialog.scss";

import * as React from "react";

export const _DialogField: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <div className="dialog__field">{children}</div>;

export const DialogField = React.memo(_DialogField);
