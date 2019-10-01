import "./create-asset.scss";

import classNames from "classnames";
import * as React from "react";

export const _CreateAssetSection: React.FC<
  React.HTMLAttributes<HTMLDivElement> & Props
> = ({ children, blockNumber, title, withBorder = true }) => {
  return (
    <>
      <div className="create-asset-section__subheading">
        <span className="create-asset-section__block-number">
          {blockNumber}
        </span>
        {title}
      </div>
      <div
        className={classNames(
          "create-asset-section__fill-block create-asset-section__row",
          {
            "create-asset-section__fill-block--with-border": withBorder
          }
        )}
      >
        {children}
      </div>
    </>
  );
};

interface Props {
  withBorder?: boolean;
  blockNumber: string;
  title: string;
}

const CreateAssetSection = React.memo(_CreateAssetSection);
export default CreateAssetSection;
