import { connect } from "react-redux";
import QueryString from "query-string";
import React, { PureComponent } from "react";

import emailConfirmService from "../service/email-confirm-service";

class EmailConfirmContainer extends PureComponent {
  componentWillMount() {
    const queryParams = QueryString.parse(this.props.location.search);
    if (queryParams.userId || queryParams.code) {
      this.props.emailConfirm(queryParams.userId, queryParams.code);
    }
  }

  render() {
    const { isPending, errorMessage } = this.props;
    if (isPending) return null;
    return <div>{errorMessage}</div>;
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage } = state.emailConfirmData;

  return { isPending, errorMessage };
};

const mapDispatchToProps = dispatch => ({
  emailConfirm: (userId, code) => {
    dispatch(emailConfirmService.confirmEmail(userId, code));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  EmailConfirmContainer
);
