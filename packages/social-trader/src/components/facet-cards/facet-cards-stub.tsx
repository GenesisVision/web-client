import { AssetFacet } from "gv-api-web";
import { tableLoaderCreator } from "utils/helpers";

export const getFacetLoaderData = (): AssetFacet => ({
  id: "",
  title: "",
  description: "",
  logo: "",
  url: "",
  sortType: "New",
  timeframe: "Day",
  sorting: ""
});

export const getFacetsLoaderData = () =>
  tableLoaderCreator(getFacetLoaderData, 4);
