import { PROGRAMS_FACET_ROUTE } from "pages/programs/programs.routes";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import replaceParams from "utils/replace-params";

import FacetCards from "./facet-cards";

const mapStateToProps = state => ({
  facets: state.platformData.facets
});

const mapDispatchToProps = dispatch => ({
  changeFacet: facetId =>
    dispatch(
      push(
        replaceParams(PROGRAMS_FACET_ROUTE, {
          ":facet": facetId
        })
      )
    )
});

const FacetCardsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FacetCards);

export default FacetCardsContainer;
