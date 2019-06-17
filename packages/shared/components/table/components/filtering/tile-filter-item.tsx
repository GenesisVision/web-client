import * as React from "react";
import GVButton from "shared/components/gv-button";
import { CloseIcon } from "shared/components/icon/close-icon";

const _TileFilterItem: React.FC<Props> = ({ remove, children }) => {
  return (
    <div className="tile-filter__item">
      {children}
      <GVButton
        variant="text"
        color="secondary"
        className="tile-filter__button-remove"
        onClick={remove}
      >
        <CloseIcon />
      </GVButton>
    </div>
  );
};

const TileFilterItem = React.memo(_TileFilterItem);
export default TileFilterItem;

interface Props {
  remove(): void;
}
