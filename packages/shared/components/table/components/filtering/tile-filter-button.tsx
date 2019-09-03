import classNames from "classnames";
import * as React from "react";
import GVButton from "shared/components/gv-button";

const _TileFilterButton: React.FC<ITagFilterButton> = ({
  title,
  isActive,
  onClick
}) => {
  return (
    <GVButton
      variant="text"
      color="secondary"
      className={classNames("tile-filter__button-add", {
        "tile-filter__button-add--active": isActive
      })}
      onClick={onClick}
    >
      <>
        <span className="tile-filter__button-plus">+</span>
        {title}
      </>
    </GVButton>
  );
};

const TileFilterButton = React.memo(_TileFilterButton);
export default TileFilterButton;

export interface ITagFilterButton {
  title: string;
  isActive?: boolean;
  onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}
