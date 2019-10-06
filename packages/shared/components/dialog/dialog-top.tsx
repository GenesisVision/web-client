import "./dialog.scss";

import * as React from "react";

export const _DialogTop: React.FC<
  React.HTMLAttributes<HTMLDivElement> & Props
> = ({ title, subtitle, children }) => (
  <div className="dialog__top">
    <div className="dialog__header">
      {title && <h2>{title}</h2>}
      {subtitle && <p>{subtitle}</p>}
    </div>
    {children && <div className="dialog-field">{children}</div>}
  </div>
);

interface Props {
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
}

export const DialogTop = React.memo(_DialogTop);
