import "./details-description-control.scss";

import { push } from "connected-react-router";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import useApiRequest from "shared/hooks/api-request.hook";
import useIsOpen from "shared/hooks/is-open.hook";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { LOGIN_ROUTE } from "shared/routes/app.routes";

import DetailsDescriptionControl from "./details-description-control";

const _DetailsFavorite: React.FC<Props> = ({
  id,
  isFavorite: isFavoriteProp
}) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const [t] = useTranslation();
  const [
    isFavorite,
    setIsFavorite,
    setIsNotFavorite,
    setIsFavoriteValue
  ] = useIsOpen(isFavoriteProp);
  const { isPending, sendRequest } = useApiRequest({
    request: toggleFavoriteProgram
  });
  const handleFavoriteClickOnButton = useCallback(
    (id: string, isFavorite: boolean) => {
      if (isAuthenticated) {
        setIsFavoriteValue(!isFavorite);
        sendRequest({ id, isFavorite });
      } else dispatch(push(LOGIN_ROUTE));
    },
    [isAuthenticated]
  );
  const handleFavoriteClickOnText = useCallback(() => {
    handleFavoriteClickOnButton(id, isFavorite);
  }, [id, isFavorite]);
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
