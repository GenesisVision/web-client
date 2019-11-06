import "./create-asset-field.scss";

import classNames from "classnames";
import * as React from "react";

export const _CreateAssetField: React.FC<
  React.HTMLAttributes<HTMLDivElement> & Props
> = ({ children, wide, className }) => {
  return (
    <div
      className={classNames("create-asset-field", className, {
        "create-asset-field--wider": wide
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

export const CreateAssetFields: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = React.memo(({ children }) => (
  <div className="create-asset-fields">{children}</div>
));

const CreateAssetField = React.memo(_CreateAssetField);
export default CreateAssetField;
