import { LIST_VIEW } from "components/table/table.constants";
import { NextPageContext } from "next";
import { getCookie, removeCookie, setCookie } from "utils/cookie";
import { NextPageWithReduxContext } from "utils/types";

export const DEFAULT_GLOBAL_TABLE_VIEW: LIST_VIEW = LIST_VIEW.CARDS;

export const GLOBAL_TABLE_VIEW_KEY = "GLOBAL_TABLE_VIEW_KEY";

export const getTableView = (
  ctx?: NextPageWithReduxContext | NextPageContext
): LIST_VIEW => {
  return (
    (getCookie(GLOBAL_TABLE_VIEW_KEY, ctx) as LIST_VIEW) ||
    DEFAULT_GLOBAL_TABLE_VIEW
  );
};

export const setTableView = (view: LIST_VIEW) => {
  setCookie(GLOBAL_TABLE_VIEW_KEY, view);
};

export const cleanTableView = () => {
  removeCookie(GLOBAL_TABLE_VIEW_KEY);
};
