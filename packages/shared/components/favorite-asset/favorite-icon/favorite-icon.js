import "./favorite-icon.scss";

import React, { Component } from "react";

import { Icon } from "../../icon/icon";
import { ReactComponent as Favorite } from "./favorite.svg";

class FavoriteIcon extends Component {
  handleClick = e => {
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

export default FavoriteIcon;
