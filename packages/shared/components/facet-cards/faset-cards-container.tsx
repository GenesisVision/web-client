import { Facet } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import RootState from "shared/reducers/root-reducer";

import FacetCards from "./facet-cards";
import FacetCardsStub from "./facet-cards-stub";
import { composeFacetUrlFunc } from "./facet-card";

export class _FacetCardsContainer extends React.PureComponent<
  Props & StateProps
> {
  render() {
    const { isPending, facets, title, composeFacetUrl } = this.props;
    if (!facets.length || isPending) return <FacetCardsStub />;
    return (
      <FacetCards
        title={title}
        facets={facets}
        composeFacetUrl={composeFacetUrl}
      />
    );
  }
}

const mapStateToProps = (state: RootState, props: Props): StateProps => {
  const { isPending, data } = state.platformData;
  let facets: Facet[] = [];
  if (data) facets = data[props.assetsFacets];
  return { isPending, facets };
};

interface StateProps {
  isPending: boolean;
  facets: Facet[];
}

interface Props {
  title: string;
  composeFacetUrl: composeFacetUrlFunc;
  assetsFacets: ASSETS_FACETS;
}

export enum ASSETS_FACETS {
  FUNDS = "fundsFacets",
  PROGRAMS = "programsFacets"
}

const FacetCardsContainer = connect(mapStateToProps)(_FacetCardsContainer);
export default FacetCardsContainer;
