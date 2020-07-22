import { api } from "services/api-client/swagger-custom-client";

export const passGuide = (id?: string) =>
  api.guides().passGuide({
    id
  });
