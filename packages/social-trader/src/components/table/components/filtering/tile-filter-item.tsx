import "./tile-filter-item.scss";

import GVButton from "components/gv-button";
import { CloseIcon } from "components/icon/close-icon";
import * as React from "react";

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

export interface ITileFilterItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  removable?: boolean;
  id: string;
  removeTile?(id: string): void;
  mandatory?: boolean;
}
