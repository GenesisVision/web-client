import * as React from "react";
import { ActionsCircleIcon } from "shared/components/icon/actions-circle-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";

class DashboardProgramsStatusBlock extends React.PureComponent<Props, State> {
  state = {
    anchor: undefined
  };

  handleOpenDropdown = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
    this.setState({ anchor: event.currentTarget });

  handleCloseDropdown = () => this.setState({ anchor: undefined });

  render() {
    const { status } = this.props;
    return (
      <div className="dashboard-programs__cell--status-block">
        {status}
        <ActionsCircleIcon
          className="dashboard-request__icon"
          primary={this.state.anchor !== null}
          onClick={this.handleOpenDropdown}
        />
        <Popover
          horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          anchorEl={this.state.anchor}
          noPadding
          onClose={this.handleCloseDropdown}
        >
          <div>Cancel</div>
        </Popover>
      </div>
    );
  }
}

interface Props {
  status: string;
}

interface State {
  anchor?: EventTarget;
}

export default DashboardProgramsStatusBlock;
