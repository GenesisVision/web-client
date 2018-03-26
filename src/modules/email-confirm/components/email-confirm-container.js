import QueryString from "query-string";
import React from "react";
import { connect } from "react-redux";

import NotFoundPage from "../../../shared/components/not-found/not-found";
import emailConfirmActions from "../actions/email-confirm-actions";

const EmailConfirmContainer = ({ location, emailConfirm }) => {
  const queryParams = QueryString.parse(location.search);
  if (!queryParams.userId || !queryParams.code) {
    return <NotFoundPage />;
  }

  emailConfirm(queryParams.userId, queryParams.code);
  return null;
};

const mapStateToProps = state => {
  const { isPending, errorMessage } = state.emailConfirmData;

  return { isPending, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  emailConfirm: () => {
    dispatch(emailConfirmActions.emailConfirm());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirmContainer);
