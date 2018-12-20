import "./favorite-icon.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";

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
      <Favorite
        onClick={this.handleClick}
        className={classnames("favorite-icon", className, {
          "favorite-icon__selected": selected
        })}
      />
    );
  }
}

FavoriteIcon.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};
export default FavoriteIcon;
