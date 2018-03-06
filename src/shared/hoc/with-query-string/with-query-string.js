import qs from "query-string";
import React from "react";
import { withRouter } from "react-router-dom";

const withQueryString = Component =>
  withRouter(({ match, location, history, staticContext, ...rest }) => {
    const params = qs.parse(location.search);

    return <Component params={params} {...rest} />;
  });

export default withQueryString;
