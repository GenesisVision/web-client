import FundsTableContainer from "modules/funds-table/components/funds-table/funds-table-container";
import ProgramsContainer from "modules/programs-table/components/programs-table/programs-table-container";
import { getPrograms } from "modules/programs-table/services/programs-table.service";
import NotFoundPage from "pages/not-found/not-found.routes";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import { getCurrentFacet } from "../../services/funds-facet.service";
import FundsFacetNavigation from "./funds-facet-navigation";

class FundsFacetContainer extends Component {
  state = {
    facetData: null
  };

  componentDidMount() {
    const { service, facets } = this.props;
    if (facets !== null) {
      this.setState({ facetData: service.getCurrentFacet() });
    }
  }

  componentDidUpdate(prevProps) {
    const { service, facets } = this.props;
    if (prevProps.facets !== facets) {
      this.setState({ facetData: service.getCurrentFacet() });
    }
  }

  render() {
    const { goBack } = this.props;
    const { facetData } = this.state;
    if (!facetData || facetData.isPending) return null;
    if (facetData.notFound) return <NotFoundPage />;
    return (
      <Fragment>
        <FundsFacetNavigation facet={facetData.facet} goBack={goBack} />
        <FundsTableContainer title={facetData.facet.title} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { data } = state.platformData;
  let facets = null;
  if (data) facets = data.fundsFacets;
  return { facets };
};

const mapDispatchToProps = dispatch => ({
  goBack: () => dispatch(goBack()),
  service: bindActionCreators({ getCurrentFacet, getPrograms }, dispatch)
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FundsFacetContainer);
