import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

class ProgramDetailsFavorite extends Component {
  handleClick = e => {
    e.stopPropagation();
    this.props.toggleFavorite(this.props.id, this.props.selected);
  };
  render() {
    const { t, programId, isFavorite, toggleFavorite } = this.props;
    return (
      <div
        className="program-details-description__control"
        onClick={this.handleClick}
      >
        <FavoriteIcon
          className="program-details-description__control-icon"
          onClick={toggleFavorite}
          id={programId}
          selected={isFavorite}
        />
        <div className="program-details-description__control-text">
          {t("program-details-page.description.addToFavorites")}
        </div>
        <div />
      </div>
    );
  }
}

export default compose(
  translate(),
  isAuthenticated
)(ProgramDetailsFavorite);
