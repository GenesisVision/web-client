import "./tile-filter-button.scss";

import classNames from "classnames";
import * as React from "react";

const _TileFilterButton: React.FC<ITagFilterButton> = ({
  title,
  isActive,
  onClick
}) => {
  return (
    <div
      className={classNames("tile-filter-button__add", {
        "tile-filter-button__add--active": isActive
      })}
      onClick={onClick}
    >
      <>
        <span className="tile-filter-button__plus">+</span>
        {title}
      </>
    </div>
  );
};

const TileFilterButton = React.memo(_TileFilterButton);
export default TileFilterButton;

export interface ITagFilterButton {
  title: string | React.ComponentType<any> | JSX.Element;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
