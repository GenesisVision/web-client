import "./asset-field.scss";

import classNames from "classnames";
import * as React from "react";

export const AssetField: React.FC<React.HTMLAttributes<HTMLDivElement> &
  Props> = ({ children, wide, hide, className }) => {
  return (
    <div
      className={classNames("asset-field", className, {
        "asset-field--hidden": hide,
        "asset-field--wider": wide
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  hide?: boolean;
  wide?: boolean;
  className?: string;
}

export const AssetFields: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <div className="asset-fields">{children}</div>;

export default AssetField;
