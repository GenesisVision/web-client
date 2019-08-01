import { Location } from "history";

export const getLocation = (): Location<any> => window.location;

export const setHash = (hash: string): void => {
  if (history.pushState) {
    history.pushState(null, "", hash);
  } else {
    location.hash = hash;
  }
};
