import "./favorite-icon.scss";

import React, { Component } from "react";
import { ReactComponent as Favorite } from "./favorite.svg";
import { Icon } from "../../icon/icon";

class FavoriteIcon extends Component {
  handleClick = e => {
    e.stopPropagation();
    if (this.props.onClick) {
      this.props.onClick(this.props.id, this.props.selected);
    }
  };
  render() {
    // console.log(this.props);
    // console.log(this.props.selected);
    return (
      <Icon type={"favorite"} {...this.props} onclick={this.handleClick}>
        <Favorite />
      </Icon>
    );
  }
}

export default FavoriteIcon;
