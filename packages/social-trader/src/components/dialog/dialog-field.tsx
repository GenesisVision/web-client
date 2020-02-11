import * as React from "react";

export const DialogField: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <div className="dialog__field">{children}</div>;
