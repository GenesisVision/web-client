import { FundFacet, ProgramFacet } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import RootState from "shared/reducers/root-reducer";

import { composeFacetUrlFunc } from "./facet-card";
import FacetCards from "./facet-cards";
import FacetCardsStub from "./facet-cards-stub";

export const _FacetCardsContainer: React.FC<Props> = ({
  isPending,
  facets,
  title,
  composeFacetUrl
}) => (
  <FacetCards
    condition={!!facets.length && !isPending}
    loader={<FacetCardsStub />}
    title={title}
    facets={facets}
    composeFacetUrl={composeFacetUrl}
  />
);

const mapStateToProps = (state: RootState, props: OwnProps): StateProps => {
  const { isPending, data } = state.platformData;
  let facets: Array<ProgramFacet & FundFacet> = [];
  if (data)
    facets = data[props.assetsFacets] as Array<ProgramFacet & FundFacet>;
  return { isPending, facets };
};

interface StateProps {
  isPending: boolean;
  facets: Array<ProgramFacet & FundFacet>;
}

interface Props extends OwnProps, StateProps {}

interface OwnProps {
  title: string;
  composeFacetUrl: composeFacetUrlFunc;
  assetsFacets: ASSETS_FACETS;
}

export enum ASSETS_FACETS {
  FUNDS = "fundsFacets",
  PROGRAMS = "programsFacets"
}

const FacetCardsContainer = connect<StateProps, null, OwnProps, RootState>(
  mapStateToProps
)(_FacetCardsContainer);
export default FacetCardsContainer;
