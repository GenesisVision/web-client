import "./tile-filter-item.scss";

import * as React from "react";
import GVButton from "shared/components/gv-button";
import { CloseIcon } from "shared/components/icon/close-icon";

const _TileFilterItem: React.FC<ITileFilterItemProps> = ({
  removable = true,
  mandatory,
  id,
  removeTile,
  children
}) => {
  return (
    <div className="tile-filter-item">
      {children}
      {!mandatory && removable && (
        <GVButton
          variant="text"
          color="secondary"
          className="tile-filter-item__button-remove"
          onClick={() => removeTile!(id)}
        >
          <CloseIcon />
        </GVButton>
      )}
    </div>
  );
};

const TileFilterItem = React.memo(_TileFilterItem);
export default TileFilterItem;

export interface ITileFilterItemProps {
  removable?: boolean;
  id: string;
  removeTile?(id: string): void;
  mandatory?: boolean;
}
