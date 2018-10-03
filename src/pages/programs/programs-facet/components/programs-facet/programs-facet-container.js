import ProgramsContainer from "modules/programs-table/components/programs-table/programs-table-container";
import { getPrograms } from "modules/programs-table/services/programs-table.service";
import NotFoundPage from "pages/not-found/not-found.routes";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import { getCurrentFacet } from "../../services/programs-facet.service";
import ProgramsFacetInfo from "./programs-facet-info";

class ProgramsFacetContainer extends Component {
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
        <ProgramsFacetInfo facet={facetData.facet} goBack={goBack} />
        <ProgramsContainer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { data } = state.platformData;
  let facets = null;
  if (data) facets = data.facets;
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
)(ProgramsFacetContainer);
