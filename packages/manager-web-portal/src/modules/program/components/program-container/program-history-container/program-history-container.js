import React, { PureComponent } from "react";
import { connect } from "react-redux";

import programActions from "../../../actions/program-actions";
import ProgramHistory from "./program-history/program-history";

class TraderHistoryContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchProgramHistory(this.props.programId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.programId !== this.props.programId) {
      this.props.fetchProgramHistory(this.props.programId);
    }
  }

  render() {
    const { isPending, history } = this.props;
    if (isPending || history === undefined) {
      return null;
    }

    return <ProgramHistory data={history} />;
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.programData.history;
  const { data: programDetail } = state.programData.programDetail;

  let history;
  if (data) {
    history = data.chart;
  }

  if (history && programDetail && programDetail.investmentProgram) {
    history = [
      {
        profit: 0,
        date: programDetail.investmentProgram.programStartDate
      },
      ...history
    ];
  }

  return {
    isPending,
    history,
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProgramHistory: programId => {
    dispatch(programActions.fetchProgramHistory(programId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TraderHistoryContainer
);
