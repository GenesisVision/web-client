import "./favorite-icon.scss";

import * as React from "react";
import { useCallback } from "react";
import { Icon } from "shared/components/icon/icon";

import { ReactComponent as Favorite } from "./favorite.svg";

const FavoriteIcon: React.FC<Props> = React.memo(
  ({ onClick, selected, className, id }) => {
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (onClick) onClick(id, selected);
      },
      [onClick, id, selected]
    );
    return (
      <Icon
        type={"favorite"} // TODO change to enum
        selected={selected}
        className={className}
        onClick={handleClick}
      >
        <Favorite />
      </Icon>
    );
  }
);

interface Props {
  id: string;
  onClick?: (id: string, selected: boolean) => void;
  selected: boolean;
  className?: string;
}

export default FavoriteIcon;
