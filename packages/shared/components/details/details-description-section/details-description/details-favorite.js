import "./details-description-controls.scss";

import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

const DetailsFavorite = ({ t, toggleFavorite, id, isFavorite }) => (
  <div className="details-description__control">
    <FavoriteIcon
      className="details-description__control-icon"
      id={id}
      selected={isFavorite}
      onClick={toggleFavorite}
    />
    <div className="details-description__control-text">
      {t("fund-details-page.description.addToFavorites")}
    </div>
  </div>
);

export default compose(
  translate(),
  isAuthenticated
)(DetailsFavorite);
