import { connect } from "react-redux";
import React, { Component } from "react";

import TournamentProgramForm from "./program-tournament-create-form/program-tournament-create-form";
import { createProgram } from "../../service/program-tournament-service";
class TournamentProgramFormContainer extends Component {
  render() {
    const { errorMessage, createProgram } = this.props;
    const handleCreateProgram = (values, setSubmitting) => {
      createProgram(values, setSubmitting);
    };

    return (
      <TournamentProgramForm
        onSubmit={handleCreateProgram}
        error={errorMessage}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage } = state.programTournamentData.createData;
  return {
    isPending,
    errorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  createProgram: (data, setSubmitting) => {
    dispatch(createProgram(data)).catch(() => {
      setSubmitting(false);
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TournamentProgramFormContainer
);
