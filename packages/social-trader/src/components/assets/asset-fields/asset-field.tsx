import "./asset-field.scss";

import classNames from "classnames";
import * as React from "react";

export const _AssetField: React.FC<
  React.HTMLAttributes<HTMLDivElement> & Props
> = ({ children, wide, className }) => {
  return (
    <div
      className={classNames("asset-field", className, {
        "asset-field--wider": wide
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  wide?: boolean;
  className?: string;
}

export const AssetFields: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = React.memo(({ children }) => (
  <div className="asset-fields">{children}</div>
));

const AssetField = React.memo(_AssetField);
export default AssetField;
