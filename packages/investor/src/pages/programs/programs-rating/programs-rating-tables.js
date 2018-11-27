import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { fetchPrograms } from "shared/modules/programs-table/services/programs-table.service";
import ProgramsTableModule from "shared/modules/programs-table/components/programs-table/programs-table-module";

class ProgramsRatingTables extends Component {
  state = {
    pretendents: null,
    selfPretendents: null,
    isPending: true
  };

  componentDidMount() {
    const { tab } = this.props;
    this.updatePretendents(tab);
  }

  updateSorting = e => {};

  updatePretendents = tab => {
    const { id } = this.props;
    fetchPrograms({})
      .then(pretendents => {
        this.setState({ pretendents });
        return true ? fetchPrograms({ managerId: id }) : [];
      })
      .then(selfPretendents => {
        this.setState({ selfPretendents, isPending: false });
      });
  };

  render() {
    const { manager } = this.props;
    const { pretendents, selfPretendents, isPending } = this.state;
    if (isPending) return null;
    return (
      <Fragment>
        {true && (
          <ProgramsTableModule
            title="Your pretendents"
            data={selfPretendents}
            isPending={isPending}
            updateSorting={this.updateSorting}
          />
        )}
        <ProgramsTableModule
          title="Pretendents"
          data={pretendents}
          isPending={isPending}
          updateSorting={this.updateSorting}
        />
      </Fragment>
    );
  }
}

export default compose(translate())(ProgramsRatingTables);
