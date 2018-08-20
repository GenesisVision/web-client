import React, { Component } from "react";

import TableRow from "../../../../components/table/table-row";
import ProgramDetailed from "./program-detailed";
import ProgramRow from "./program-table-row";

class Program extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailed: false
    };
  }

  openProgramDetail = () => {
    this.setState({ isDetailed: true });
  };

  closeProgramDetail = () => {
    this.setState({ isDetailed: false });
  };

  render() {
    const { program } = this.props;
    const { isDetailed } = this.state;
    if (isDetailed)
      return (
        <ProgramDetailed
          program={program}
          onCollapseClick={this.closeProgramDetail}
        />
      );
    return (
      <TableRow>
        <ProgramRow program={program} onExpandClick={this.openProgramDetail} />
      </TableRow>
    );
  }
}

export default Program;
