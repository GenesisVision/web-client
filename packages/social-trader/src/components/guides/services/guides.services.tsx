import { fetchGuidesAction } from "pages/guides/actions/guides.actions";
import { api } from "services/api-client/swagger-custom-client";
import { NextPageWithReduxContext, RootThunk } from "utils/types";

export const passGuide = (id: string) =>
  api.guides().passGuide({
    id
  });

export const fetchGuides = (
  ctx?: NextPageWithReduxContext
): RootThunk<void> => async dispatch => {
  await dispatch(fetchGuidesAction(ctx?.token));
};
