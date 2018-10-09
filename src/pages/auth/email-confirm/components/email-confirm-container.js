import React, { PureComponent } from "react";
import { connect } from "react-redux";

import emailConfirmService from "../service/email-confirm-service";
import EmailConfirmSuccess from "./email-confirm-success";

class EmailConfirmContainer extends PureComponent {
  componentDidMount() {
    const { queryParams } = this.props;
    if (queryParams.userId || queryParams.code) {
      this.props.emailConfirm(queryParams.userId, queryParams.code);
    }
  }

  render() {
    const { isPending } = this.props;
    if (isPending) return null;
    return <EmailConfirmSuccess />;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailConfirmContainer);
