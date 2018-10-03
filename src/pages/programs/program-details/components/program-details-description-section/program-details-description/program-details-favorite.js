import FavoriteIcon from "modules/favorite-asset/components/favorite-icon/favorite-icon";
import React from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import isAuthenticated from "shared/decorators/is-authenticated";

const ProgramDetailsFavorite = ({
  t,
  toggleFavorite,
  programId,
  isFavorite
}) => (
  <div className="program-details-description__control">
    <FavoriteIcon
      className="program-details-description__control-icon"
      toggleSelected={toggleFavorite}
      id={programId}
      selected={isFavorite}
    />
    <div className="program-details-description__control-text">
      {t("program-details-page.description.addToFavorites")}
    </div>
    <div />
  </div>
);

export default compose(
  translate(),
  isAuthenticated
)(ProgramDetailsFavorite);
