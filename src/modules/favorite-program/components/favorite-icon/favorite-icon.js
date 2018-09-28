import "./favorite-icon.scss";

import classnames from "classnames";
import PropTypes from "prop-types";
import React, { Component } from "react";

class FavoriteIcon extends Component {
  handleClick = e => {
    e.stopPropagation();
    this.props.toggleSelected(this.props.programId, this.props.selected);
  };

  render() {
    const { selected, className } = this.props;
    return (
      <svg
        className={classnames("favorite-icon", className, {
          "favorite-icon__selected": selected
        })}
        onClick={this.handleClick}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10.4729 0.329426L13.0169 6.64343L19.5298 7.23016C19.9815 7.27107 20.1652 7.8621 19.8224 8.17322L14.8822 12.6614L16.3626 19.3382C16.4653 19.8022 15.9859 20.1671 15.5978 19.9206L10.0006 16.3809L4.40348 19.9206C4.01439 20.1661 3.53598 19.8011 3.63865 19.3382L5.11904 12.6614L0.177895 8.17214C-0.164997 7.86102 0.0177418 7.26999 0.470483 7.22908L6.98339 6.64236L9.52737 0.329426C9.70395 -0.109809 10.2963 -0.109809 10.4729 0.329426Z" />
      </svg>
    );
  }
}

FavoriteIcon.propTypes = {
  className: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  toggleSelected: PropTypes.func.isRequired
};
export default FavoriteIcon;
