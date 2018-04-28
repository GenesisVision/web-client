import { connect } from "react-redux";
import qs from "qs";
import React, { PureComponent } from "react";

import emailConfirmService from "../service/email-confirm-service";

class EmailConfirmContainer extends PureComponent {
  componentWillMount() {
    const queryParams = qs.parse(
      this.props.location.searchlocation.search.slice(1)
    );
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
