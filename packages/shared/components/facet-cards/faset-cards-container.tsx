import { Facet } from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import RootState from "shared/reducers/root-reducer";

import FacetCards from "./facet-cards";
import FacetCardsStub from "./facet-cards-stub";

interface IFacetCardsContainerStateProps {
  isPending: boolean;
  facets: Facet[];
}

interface IFacetCardsContainerProps {
  title: string;
  composeFacetUrl(url: string): string;
  assetsFacets: "fundsFacets" | "programsFacets";
}

class FacetCardsContainer extends React.Component<
  IFacetCardsContainerProps & IFacetCardsContainerStateProps
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

const mapStateToProps = (
  state: RootState,
  props: IFacetCardsContainerProps
): IFacetCardsContainerStateProps => {
  const { isPending, data } = state.platformData;
  let facets: Facet[] = [];
  if (data) facets = data[props.assetsFacets];
  return { isPending, facets };
};

export default connect(mapStateToProps)(FacetCardsContainer);
