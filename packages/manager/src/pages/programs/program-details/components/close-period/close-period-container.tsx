import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { closePeriod } from "shared/components/programs/program-details/services/program-details.service";

import ClosePeriod from "./close-period";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  service: bindActionCreators({ closePeriod }, dispatch)
});

const ClosePeriodContainer: any = connect(
  null,
  mapDispatchToProps
)(ClosePeriod);

export default ClosePeriodContainer;
