import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { fetchPrograms } from "shared/modules/programs-table/services/programs-table.service";
import ProgramsTableModule from "shared/modules/programs-table/components/programs-table/programs-table-module";

class ProgramsRatingTable extends Component {
  state = {
    programs: null,
    isPending: true
  };

  componentDidMount() {
    const { tab } = this.props;
    this.updatePrograms(tab);
  }

  updateSorting = e => {};

  updatePrograms = tab => {
    const { managerId } = this.props;
    fetchPrograms({ managerId, tab }).then(programs => {
      this.setState({ programs, isPending: false });
    });
  };

  render() {
    const { title } = this.props;
    const { programs, isPending } = this.state;
    if (isPending) return null;
    return (
      <ProgramsTableModule
        title={title}
        data={programs}
        isPending={isPending}
      />
    );
  }
}

export default compose(translate())(ProgramsRatingTable);
