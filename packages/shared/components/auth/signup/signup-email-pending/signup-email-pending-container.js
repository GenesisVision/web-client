import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import SignupEmailPending from "./signup-email-pending";

const mapDispatchToProps = (dispatch, props) => ({
  service: bindActionCreators({ sendConfirmationLink: props.sendConfirmationLink }, dispatch)
});

const SignupEmailPendingContainer = connect(
  null,
  mapDispatchToProps
)(SignupEmailPending);

export default SignupEmailPendingContainer;
