import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as emailConfirmService from "../service/email-confirm-service";
import EmailConfirmFailure from "./email-confirm-failure";

class EmailConfirmContainer extends PureComponent {
  state = {
    isPending: true,
    errorMessage: "",
    code: null
  };

  componentDidMount() {
    const { queryParams, service } = this.props;
    if (queryParams.userId || queryParams.code) {
      service
        .confirmEmail(queryParams.userId, queryParams.code)
        .catch(response => this.setState(response));
    }
  }

  render() {
    const { isPending, errorMessage } = this.state;
    if (isPending) return null;
    return <EmailConfirmFailure errorMessage={errorMessage} />;
  }
}

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(emailConfirmService, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(EmailConfirmContainer);
