import clsx from "clsx";
import * as React from "react";

import styles from "./tile-filter-button.module.scss";

const _TileFilterButton: React.FC<ITagFilterButton> = ({
  title,
  isActive,
  onClick
}) => {
  return (
    <div
      className={clsx(styles["tile-filter-button__add"], {
        [styles["tile-filter-button__add--active"]]: isActive
      })}
      onClick={onClick}
    >
      <>
        <span className={styles["tile-filter-button__plus"]}>+</span>
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
