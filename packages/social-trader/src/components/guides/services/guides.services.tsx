import { GuidesCategory } from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import Token from "services/api-client/token";

export const passGuide = (id: string) =>
  api.guides().passGuide({
    id
  });

export const fetchGuides = (): Promise<GuidesCategory[]> =>
  api
    .guides()
    .getGuides()
    .then(({ items }) => items);
