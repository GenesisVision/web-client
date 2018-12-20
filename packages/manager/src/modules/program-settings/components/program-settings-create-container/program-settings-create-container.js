import React, { Component } from "react";
import { connect } from "react-redux";

import programActions from "../../actions/program-settings-actions";
import programSettingsSevice from "../../service/program-settings-service";
import ProgramCreateForm from "./program-settings-create-form/program-settings-create-form";

class ProgramSettingsCreateContainer extends Component {
  componentDidMount() {
    this.props.fetchProgramForm();
  }
  render() {
    const { isPending, programForm, errorMessage, createProgram } = this.props;
    const handleCreateProgram = (values, setSubmitting) => {
      createProgram(values, setSubmitting);
      setSubmitting(false);
    };
    if (isPending || programForm === undefined) {
      return null;
    }

    return (
      <ProgramCreateForm
        programForm={programForm}
        onSubmit={handleCreateProgram}
        error={errorMessage}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isPending, errorMessage, data } = state.programSettingsData.formData;
  const {
    errorMessage: errorMessageOnSubmit
  } = state.programSettingsData.createSettingsData;

  return {
    isPending,
    errorMessage: errorMessage || errorMessageOnSubmit,
    programForm: data
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProgramForm: () => {
    dispatch(programActions.fetchProgramForm());
  },
  createProgram: (data, setSubmitting) => {
    dispatch(programSettingsSevice.createProgram(data)).catch(() => {
      setSubmitting(false);
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramSettingsCreateContainer);
