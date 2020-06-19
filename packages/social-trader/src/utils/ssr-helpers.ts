import { NextPageContext } from "next";
import * as qs from "qs";

export const getParamsFromCtx = (ctx: NextPageContext) => {
  const { asPath = "", pathname } = ctx;
  return qs.parse(asPath.slice(pathname.length + 1));
};

export const getParamsFromCtxWithSplit = (ctx: NextPageContext) => {
  const { asPath = "" } = ctx;
  const [path, params = ""] = asPath.split("?");
  return qs.parse(params);
};
