import "./dialog.scss";

import * as React from "react";

export const DialogList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <ul className="dialog-list">{children}</ul>;
