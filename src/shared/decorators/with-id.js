import React from "react";
import v4 from "uuid/v4";

const withId = Component => props => <Component id={v4()} {...props} />;

export default withId;
