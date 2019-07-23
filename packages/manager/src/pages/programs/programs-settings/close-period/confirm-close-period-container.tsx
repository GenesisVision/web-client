import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { closePeriod } from "shared/components/programs/program-details/services/program-details.service";

import ConfirmClosePeriod from "./confirm-close-period";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators({ closePeriod }, dispatch)
});

const ConfirmClosePeriodContainer = connect(
  null,
  mapDispatchToProps
)(ConfirmClosePeriod);

export default ConfirmClosePeriodContainer;
