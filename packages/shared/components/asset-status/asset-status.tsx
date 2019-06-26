import "./asset-status.scss";

import * as React from "react";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import { STATUS } from "shared/constants/constants";

import AssetStatusLabel from "./asset-status-label";
import AssetStatusRequests from "./asset-status-requests";

class AssetStatus extends React.PureComponent<Props, State> {
  state = {
    anchor: undefined
  };

  handleOpenDropdown = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (
      this.props.status === STATUS.INVESTING ||
      this.props.status === STATUS.WITHDRAWING
    )
      this.setState({ anchor: event.currentTarget });
  };
  handleCloseDropdown = () => this.setState({ anchor: undefined });

  render() {
    const { className, status, id, asset, onCancel } = this.props;
    return (
      <>
        <AssetStatusLabel
          status={status}
          className={className}
          onClick={this.handleOpenDropdown}
        />
        <Popover
          horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          anchorEl={this.state.anchor}
          noPadding
          onClose={this.handleCloseDropdown}
        >
          <div className="dashboard-request-popover">
            <AssetStatusRequests
              id={id}
              asset={asset}
              handleCloseDropdown={this.handleCloseDropdown}
              onCancel={onCancel}
            />
          </div>
        </Popover>
      </>
    );
  }
}

interface Props {
  className?: string;
  status: STATUS;
  id: string;
  asset: any;
  onCancel: any;
}

interface State {
  anchor?: EventTarget;
}

export default AssetStatus;
