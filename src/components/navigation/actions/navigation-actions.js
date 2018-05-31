import {
  NAVIGATION_CLOSE,
  NAVIGATION_OPEN
} from "./navigation-actions.constants";

export function navigationClose() {
  return {
    type: NAVIGATION_CLOSE
  };
}

export function navigationOpen() {
  return {
    type: NAVIGATION_OPEN
  };
}
