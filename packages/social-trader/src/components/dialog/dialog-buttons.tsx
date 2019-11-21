import "./dialog.scss";

import * as React from "react";

export const _DialogButtons: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <div className="dialog__buttons">{children}</div>;

export const DialogButtons = React.memo(_DialogButtons);
