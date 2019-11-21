import "./dialog.scss";

import * as React from "react";

export const _DialogList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <ul className="dialog-list">{children}</ul>;

export const DialogList = React.memo(_DialogList);
