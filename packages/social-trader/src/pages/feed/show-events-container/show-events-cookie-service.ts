import { NextPageContext } from "next";
import { cookieServiceCreator } from "utils/cookie-service.creator";
import { NextPageWithReduxContext } from "utils/types";

type StateType = { value: boolean };

export const DEFAULT_SHOW_EVENTS_STATE: StateType = { value: true };

export const SHOW_EVENTS_KEY = "showEvents";

export const { get, set, clear } = cookieServiceCreator<StateType>({
  parse: true,
  key: SHOW_EVENTS_KEY,
  initialState: DEFAULT_SHOW_EVENTS_STATE
});

export const getShowEventsState = (
  ctx?: NextPageWithReduxContext | NextPageContext
) => {
  return get(ctx).value;
};
export const setShowEventsState = (value: boolean) => {
  set({ value });
};
export const cleanShowEventsState = () => {
  clear();
};
