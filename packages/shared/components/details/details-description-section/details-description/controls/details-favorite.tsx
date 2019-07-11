import "./details-description-control.scss";

import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import isAuthenticated from "shared/decorators/is-authenticated";
import useIsOpen from "shared/hooks/is-open.hook";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";

import DetailsDescriptionControl from "./details-description-control";

const _DetailsFavorite: React.FC<Props> = ({
  t,
  id,
  isFavorite: isFavoriteProp
}) => {
  const [
    isFavorite,
    setIsFavorite,
    setIsNotFavorite,
    setIsFavoriteValue
  ] = useIsOpen(isFavoriteProp);
  const [isPending, setIsPending, setIsNotPending] = useIsOpen();
  const handleFavoriteClickOnButton = useCallback(
    (id: string, isFavorite: boolean) => {
      setIsFavoriteValue(!isFavorite);
      setIsPending();
      toggleFavoriteProgram(id, isFavorite)
        .catch(() => setIsFavoriteValue(isFavorite))
        .then(setIsNotPending); // TODO change to finally
    },
    []
  );
  const handleFavoriteClickOnText = useCallback(
    () => handleFavoriteClickOnButton(id, isFavorite),
    [id]
  );
  return (
    <DetailsDescriptionControl
      tag="button"
      className="details-description-control--button"
      onClick={handleFavoriteClickOnText}
      disabled={isPending}
      text={t("fund-details-page.description.addToFavorites")}
    >
      <FavoriteIcon
        className="details-description-control__icon"
        id={id}
        selected={isFavorite}
        onClick={handleFavoriteClickOnButton}
      />
    </DetailsDescriptionControl>
  );
};

interface OwnProps {
  id: string;
  isFavorite: boolean;
}

interface Props extends OwnProps, WithTranslation {}

const DetailsFavorite = compose<React.ComponentType<OwnProps>>(
  translate(),
  isAuthenticated,
  React.memo
)(_DetailsFavorite);
export default DetailsFavorite;
