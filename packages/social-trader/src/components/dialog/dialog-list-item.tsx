import "./dialog.scss";

import * as React from "react";

export const _DialogListItem: React.FC<React.HTMLAttributes<HTMLDivElement> &
  Props> = ({ label, children }) => (
  <li className="dialog-list__item">
    <span className="dialog-list__title">{label}</span>
    <span className="dialog-list__value">{children}</span>
  </li>
);

interface Props {
  label: string;
}

export const DialogListItem = React.memo(_DialogListItem);
