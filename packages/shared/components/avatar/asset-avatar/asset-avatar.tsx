import * as React from "react";
import GVProgramAvatar, {
  GVProgramAvatarProps
} from "shared/components/gv-program-avatar";
import { ILevelTooltip } from "shared/components/level-tooltip/level-tooltip";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "shared/components/popover/popover";
import withUrl from "shared/decorators/with-url";

interface IAssetAvatarProps {
  tooltip?: React.ReactElement<ILevelTooltip>;
  click?: boolean;
  vertical?: VERTICAL_POPOVER_POS;
  horizontal?: HORIZONTAL_POPOVER_POS;
  onClickLevel?: (e: any) => void;
  alt: string;
}

interface IAssetAvatarState {
  anchor?: EventTarget;
}

class _AssetAvatar extends React.PureComponent<
  IAssetAvatarProps,
  IAssetAvatarState
> {
  state = {
    anchor: undefined
  };

  handleClick = (event: React.SyntheticEvent) => {
    this.setState({ anchor: event.currentTarget });
  };

  handleMouseEnter = (event: React.MouseEvent) => {
    if (this.props.click) return;
    this.setState({ anchor: event.currentTarget });
  };

  handleMouseLeave = (event: React.MouseEvent) => {
    if (this.props.click) return;
    this.setState({ anchor: undefined });
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

const AssetAvatar = withUrl<GVProgramAvatarProps & IAssetAvatarProps>("url")(
  _AssetAvatar
);
export default AssetAvatar;
