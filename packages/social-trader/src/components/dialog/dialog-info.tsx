import "./dialog.scss";

import * as React from "react";

export const _DialogInfo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <div className="dialog__info">{children}</div>;

export const DialogInfo = React.memo(_DialogInfo);
