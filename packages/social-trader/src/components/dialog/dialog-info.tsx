import "./dialog.scss";

import * as React from "react";

export const DialogInfo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <div className="dialog__info">{children}</div>;
