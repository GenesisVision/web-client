import "./dialog.scss";

import * as React from "react";

import { DialogField } from "./dialog-field";

export const _DialogTop: React.FC<
  React.HTMLAttributes<HTMLDivElement> & Props
> = ({ title, subtitle, children }) => (
  <div className="dialog__top">
    <div className="dialog__header">
      {title && <h2>{title}</h2>}
      {subtitle && <div className="dialog__subtitle">{subtitle}</div>}
    </div>
    {children}
  </div>
);

interface Props {
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
}

export const DialogTop = React.memo(_DialogTop);
