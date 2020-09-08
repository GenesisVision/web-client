import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useState } from "react";
import { api } from "services/api-client/swagger-custom-client";

import styles from "./market-watch.module.scss";

export interface IMarketWatchFavoriteButtonProps {
  id: string;
  isFavorite: boolean;
  symbol: string;
}

const addToFavorites = (id: string, symbol: string) =>
  api.assets().addFavoriteSymbol(id, symbol);

const removeFromFavorites = (id: string, symbol: string) =>
  api.assets().removeFavoriteSymbol(id, symbol);

const toggleFavorites = ({
  isFavorite,
  id,
  symbol
}: {
  isFavorite: boolean;
  id: string;
  symbol: string;
}) =>
  isFavorite ? removeFromFavorites(id, symbol) : addToFavorites(id, symbol);

const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  onClick,
  children
}) => (
  <div onClick={onClick} className={styles["market-watch-favorite-button"]}>
    {children}
  </div>
);

const _MarketWatchFavoriteButton: React.FC<IMarketWatchFavoriteButtonProps> = ({
  id,
  symbol,
  isFavorite
}) => {
  const [innerIsFavorite, setInnerIsFavorite] = useState(isFavorite);
  const { sendRequest } = useApiRequest({ request: toggleFavorites });

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      innerIsFavorite ? setInnerIsFavorite(false) : setInnerIsFavorite(true);
      return sendRequest({ isFavorite: innerIsFavorite, id, symbol });
    },
    [innerIsFavorite, id, symbol]
  );

  return (
    <Container onClick={handleClick}>
      <FavoriteIcon selected={innerIsFavorite} />
    </Container>
  );
};

export const MarketWatchFavoriteButton = React.memo(_MarketWatchFavoriteButton);
