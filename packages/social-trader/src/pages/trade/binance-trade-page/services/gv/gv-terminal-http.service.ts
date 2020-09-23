import { api } from "services/api-client/swagger-custom-client";

export const getFavorites = async (id?: string) =>
  id
    ? await api
        .terminal()
        .getTradingPlatformFavoriteSymbols(id)
        .then(({ items }) => items)
    : [];
