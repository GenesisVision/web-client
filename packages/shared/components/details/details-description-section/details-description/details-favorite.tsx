import "./details-description-control.scss";

import React from "react";
import { TranslationFunction, translate } from "react-i18next";
import { compose } from "redux";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import isAuthenticated from "shared/decorators/is-authenticated";

import DetailsDescriptionControl from "./details-description-control";

export interface IDetailsFavoriteProps {
  t: TranslationFunction;
  toggleFavorite(): void;
  id: string;
  isFavorite: boolean;
}

const DetailsFavorite: React.SFC<IDetailsFavoriteProps> = ({
  t,
  toggleFavorite,
  id,
  isFavorite
}) => (
  <DetailsDescriptionControl
    tag="button"
    className="details-description-control--button"
    onClick={toggleFavorite}
    text={t("fund-details-page.description.addToFavorites")}
  >
    <FavoriteIcon
      className="details-description-control__icon"
      id={id}
      selected={isFavorite}
      onClick={toggleFavorite}
    />
  </DetailsDescriptionControl>
);

export default compose<React.FunctionComponent>(
  translate(),
  isAuthenticated
)(DetailsFavorite);
