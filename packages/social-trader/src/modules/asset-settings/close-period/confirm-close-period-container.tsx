import { closePeriod } from "pages/invest/programs/program-details/service/program-details.service";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import ConfirmClosePeriod from "./confirm-close-period";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators({ closePeriod }, dispatch)
});

const ConfirmClosePeriodContainer = connect(
  null,
  mapDispatchToProps
)(ConfirmClosePeriod);

export default ConfirmClosePeriodContainer;
