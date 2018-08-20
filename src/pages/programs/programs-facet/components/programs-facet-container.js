import NotFoundPage from "pages/not-found/not-found.routes";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { goBack } from "react-router-redux";
import { bindActionCreators, compose } from "redux";

import ProgramsContainer from "../../../../modules/programs/components/programs/programs-container";
import { getCurrentFacet } from "../../../../modules/programs/services/programs-facet-service";
import { getPrograms } from "../../../../modules/programs/services/programs-service";
import ProgramsFacet from "../../../modules/programs/components/programs-facet/programs-facet";
import ProgramsFacetStub from "../../../modules/programs/components/programs-facet/programs-facet-stub";

class ProgramsFacetPage extends Component {
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
    if (!facetData || facetData.isPending) return <ProgramsFacetStub />;
    if (facetData.notFound) return <NotFoundPage />;
    return (
      <Fragment>
        <ProgramsFacet facet={facetData.facet} goBack={goBack} />
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
)(ProgramsFacetPage);
