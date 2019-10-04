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

const CreateAssetField = React.memo(_CreateAssetField);
export default CreateAssetField;
