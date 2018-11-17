import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { closePeriod } from "../services/program-details.service";
import ClosePeriod from "./close-period";

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators({ closePeriod }, dispatch)
});

const ClosePeriodContaier = connect(null, mapDispatchToProps)(ClosePeriod);
export default ClosePeriodContaier;
