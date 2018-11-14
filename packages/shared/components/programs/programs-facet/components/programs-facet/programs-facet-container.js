import NotFoundPage from "share/components/not-found/not-found.routes";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class ProgramsFacetContainer extends Component {
  state = {
    facetData: null
  };

  componentDidMount() {
    const { getCurrentFacet, facets } = this.props;
    if (facets !== null) {
      this.setState({ facetData: getCurrentFacet() });
    }
  }

  componentDidUpdate(prevProps) {
    const { getCurrentFacet, facets } = this.props;
    if (prevProps.facets !== facets) {
      this.setState({ facetData: getCurrentFacet() });
    }
  }

  render() {
    const { ProgramsContainer } = this.props;
    const { facetData } = this.state;
    if (!facetData || facetData.isPending) return null;
    if (facetData.notFound) return <NotFoundPage />;
    return (
      <Fragment>
        <ProgramsContainer title={facetData.facet.title} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { data } = state.platformData;
  let facets = null;
  if (data) facets = data.programsFacets;
  return { facets };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ProgramsFacetContainer);
