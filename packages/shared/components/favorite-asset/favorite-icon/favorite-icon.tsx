import "./favorite-icon.scss";

import * as React from "react";
import { Icon } from "shared/components/icon/icon";

import { ReactComponent as Favorite } from "./favorite.svg";

class FavoriteIcon extends React.Component<IFavoriteIconProps> {
  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (this.props.onClick) {
      this.props.onClick(this.props.id, this.props.selected);
    }
  };
  render() {
    const { selected, className } = this.props;
    return (
      <Icon
        type={"favorite"}
        selected={selected}
        className={className}
        onClick={this.handleClick}
      >
        <Favorite />
      </Icon>
    );
  }
}

interface IFavoriteIconProps {
  id: string;
  onClick?(id: string, selected: boolean): void;
  selected: boolean;
  className?: string;
}

export default FavoriteIcon;
