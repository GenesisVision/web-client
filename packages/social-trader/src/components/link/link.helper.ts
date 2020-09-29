import React, { useContext } from "react";
import * as uuid from "uuid";

import { ToType } from "./link";

export const pushHistoryState = (to: ToType) => {
  window.history.pushState(
    { options: { from: to.state }, as: to.as, url: to.pathname },
    uuid.v4(),
    to.as || to.pathname
  );
};

export const normalizeTo = (to: ToType | string): ToType => {
  return typeof to === "string" ? { pathname: to } : to;
};

export const normalizeLinkFrom = (to: ToType | string): string => {
  return typeof to === "string" ? to : to.pathname;
};

export const createToUrl = (
  as: string,
  pathname: string,
  state: string
): ToType => ({
  as,
  pathname,
  state: `/ ${state}`
});

export const TitleContext = React.createContext("");

export const useToLink = (): {
  contextTitle: string;
  linkCreator: (
    as: string,
    pathname?: string,
    title?: string
  ) => ToType | string;
} => {
  const contextTitle = useContext(TitleContext);
  const linkCreator = (
    as: string,
    pathname: string = "",
    title: string = ""
  ) => {
    const state = title || contextTitle;
    return state ? createToUrl(as, pathname || as, state) : as;
  };
  return { contextTitle, linkCreator };
};
