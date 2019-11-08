import { SLUG_URL_PARAM_NAME } from "shared/routes/app.routes";
import replaceParams from "shared/utils/replace-params";

export const CREATE_PROGRAM_PAGE_ROUTE = "/create-program";
export const CREATE_PROGRAM_PAGE_SLUG_ROUTE = `${CREATE_PROGRAM_PAGE_ROUTE}/:${SLUG_URL_PARAM_NAME}`;

export const composeCreateProgramUrl = (slugUrl: string): string =>
  replaceParams(`${CREATE_PROGRAM_PAGE_SLUG_ROUTE}`, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });
