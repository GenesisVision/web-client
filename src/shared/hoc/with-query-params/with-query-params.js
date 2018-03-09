import qs from "query-string";
import React from "react";
import { withRouter } from "react-router-dom";

const withQueryParams = Component =>
  withRouter(({ match, location, history, staticContext, ...rest }) => {
    const queryParams = qs.parse(location.search);

    return <Component queryParams={queryParams} {...rest} />;
  });

export default withQueryParams;
