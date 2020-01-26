import { getFacetsLoaderData } from "components/facet-cards/facet-cards-stub";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "reducers/root-reducer";

import { composeFacetUrlFunc } from "./facet-card";
import FacetCards from "./facet-cards";

export enum ASSETS_FACETS {
  FUNDS = "fundInfo",
  PROGRAMS = "programInfo",
  FOLLOWS = "followInfo"
}

export const _FacetCardsContainer: React.FC<Props> = ({
  title,
  composeFacetUrl,
  assetsFacets,
  fileRoute
}) => {
  const info = useSelector((state: RootState) => state.platformData.data);
  return (
    <FacetCards
      title={title}
      loaderData={getFacetsLoaderData()}
      data={info?.assetInfo[assetsFacets]?.facets!}
      composeFacetUrl={composeFacetUrl}
      fileRoute={fileRoute}
    />
  );
};

const FacetCardsContainer = React.memo(_FacetCardsContainer);
export default FacetCardsContainer;

interface Props {
  title: string;
  composeFacetUrl: composeFacetUrlFunc;
  assetsFacets: ASSETS_FACETS;
  fileRoute: string;
}
