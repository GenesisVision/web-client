import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { sendConfirmationLink } from "../../../services/signup-email-pending.service";
import SignupEmailPending from "./signup-email-pending";

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ sendConfirmationLink }, dispatch)
});

const SignupEmailPendingContainer = connect(null, mapDispatchToProps)(
  SignupEmailPending
);

export default SignupEmailPendingContainer;
