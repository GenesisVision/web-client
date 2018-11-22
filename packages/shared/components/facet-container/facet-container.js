import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import NotFoundPage from "shared/components/not-found/not-found.routes";

class FacetContainer extends Component {
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
    const { TableContainer } = this.props;
    const { facetData } = this.state;
    if (!facetData || facetData.isPending) return null;
    if (facetData.notFound) return <NotFoundPage />;
    return (
      <Fragment>
        <TableContainer title={facetData.facet.title} />
      </Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { data } = state.platformData;
  let facets = null;
  if (data) facets = data[props.asset];
  return { facets };
};

const mapDispatchToProps = (dispatch, props) => {
  const { getCurrentFacet } = props;
  return {
    service: bindActionCreators({ getCurrentFacet }, dispatch)
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(FacetContainer);
