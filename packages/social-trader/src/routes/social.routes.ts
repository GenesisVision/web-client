import { ToType } from "components/link/link";
import { createToUrl } from "components/link/link.helper";
import { SLUG_URL_PARAM_NAME } from "routes/app.routes";
import replaceParams from "utils/replace-params";

export const SOCIAL = "social";
export const SOCIAL_ROUTE = `/${SOCIAL}`;

export const USERS = "users";
export const USERS_ROUTE = `${SOCIAL_ROUTE}/${USERS}`;

export const RATING = "rating";
export const RATING_ROUTE = `${SOCIAL_ROUTE}/${RATING}`;

export const MY_PROFILE = "my-profile";
export const MY_PROFILE_ROUTE = `${SOCIAL_ROUTE}/${MY_PROFILE}`;

export const MEDIA = "media";
export const MEDIA_ROUTE = `${SOCIAL_ROUTE}/${MEDIA}`;

export const NEWS = "news";
export const NEWS_ROUTE = `${SOCIAL_ROUTE}/${NEWS}`;

export const POSTS = "posts";
export const POSTS_ROUTE = `/${POSTS}`;
export const POST_ROUTE = `${POSTS_ROUTE}/:${SLUG_URL_PARAM_NAME}`;
export const POST_FOLDER_ROUTE = `${POSTS_ROUTE}/[id]`;

export const composePostDetailsUrl = (slugUrl: string): string =>
  replaceParams(POST_ROUTE, {
    [`:${SLUG_URL_PARAM_NAME}`]: slugUrl
  });

export const postToPathCreator = (url: string, title: string): ToType =>
  createToUrl(composePostDetailsUrl(url), POST_FOLDER_ROUTE, title);
