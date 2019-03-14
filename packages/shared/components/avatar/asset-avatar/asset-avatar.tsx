import { GVProgramAvatar } from "gv-react-components";
import * as React from "react";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import withUrl from "shared/decorators/with-url";
import { Nullable } from "shared/utils/types";

interface IAssetAvatarProps {
  tooltip: boolean;
  click?: boolean;
  vertical?: VERTICAL_POPOVER_POS;
  horizontal?: HORIZONTAL_POPOVER_POS;
  onClickLevel?: (e: any) => void;
}

interface IAssetAvatarState {
  anchor: Nullable<EventTarget>;
}

class AssetAvatar extends React.Component<
  IAssetAvatarProps,
  IAssetAvatarState
> {
  state = {
    anchor: null
  };

  handleClick = event => {
    this.setState({ anchor: event.currentTarget });
  };

  handleMouseEnter = (event: React.MouseEvent) => {
    if (this.props.click) return;
    this.setState({ anchor: event.currentTarget });
  };

  handleMouseLeave = (event: React.MouseEvent) => {
    if (this.props.click) return;
    this.setState({ anchor: null });
  };

  render() {
    const { tooltip, onClickLevel } = this.props;
    return (
      <React.Fragment>
        <GVProgramAvatar
          onMouseEnterLevel={this.handleMouseEnter}
          onMouseLeaveLevel={this.handleMouseLeave}
          onClickLevel={onClickLevel}
          {...this.props}
        />
        {tooltip && (
          <Popover
            disableBackdropClick
            noPadding
            anchorEl={this.state.anchor}
            className="tooltip__popover"
            vertical={this.props.vertical}
            horizontal={this.props.horizontal}
          >
            {tooltip}
          </Popover>
        )}
      </React.Fragment>
    );
  }
}

export default withUrl("url")(AssetAvatar);
