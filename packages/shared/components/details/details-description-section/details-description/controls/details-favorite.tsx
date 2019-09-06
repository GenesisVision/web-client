import "./details-description-control.scss";

import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import useIsOpen from "shared/hooks/is-open.hook";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";

import DetailsDescriptionControl from "./details-description-control";

const _DetailsFavorite: React.FC<Props> = ({
  id,
  isFavorite: isFavoriteProp
}) => {
  const [t] = useTranslation();
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
        .finally(setIsNotPending);
    },
    []
  );
  const handleFavoriteClickOnText = useCallback(
    () => handleFavoriteClickOnButton(id, isFavorite),
    [id, isFavorite]
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

interface Props {
  id: string;
  isFavorite: boolean;
}

const DetailsFavorite = React.memo(_DetailsFavorite);
export default DetailsFavorite;
