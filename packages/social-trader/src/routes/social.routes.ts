import { ToType } from "components/link/link";
import { createToUrl } from "components/link/link.helper";
import { SLUG_URL_PARAM_NAME } from "routes/app.routes";
import replaceParams from "utils/replace-params";

export const POSTS_ROUTE = "/posts";
export const POST_ROUTE = `${POSTS_ROUTE}/:${SLUG_URL_PARAM_NAME}`;
export const POST_FOLDER_ROUTE = `${POSTS_ROUTE}/[id]`;

export const composePostDetailsUrl = (slugUrl: string): string =>
  replaceParams(POST_ROUTE, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const postToPathCreator = (url: string, title: string): ToType =>
  createToUrl(composePostDetailsUrl(url), POST_FOLDER_ROUTE, title);
