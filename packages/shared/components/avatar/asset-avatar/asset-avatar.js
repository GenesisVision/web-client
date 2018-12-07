import { GVProgramAvatar } from "gv-react-components";
import React, { Fragment, PureComponent } from "react";
import Popover from "shared/components/popover/popover";
import withUrl from "shared/decorators/with-url";

class AssetAvatar extends PureComponent {
  state = {
    anchor: null
  };

  handleClick = event => {
    this.setState({ anchor: event.currentTarget });
  };

  handleMouseEnter = event => {
    if (this.props.click) return;
    this.setState({ anchor: event.currentTarget });
  };

  handleMouseLeave = () => {
    if (this.props.click) return;
    this.closePopup();
  };

  closePopup = () => {
    this.setState({ anchor: null });
  };

  render() {
    const { tooltip, click } = this.props;
    return (
      <Fragment>
        <GVProgramAvatar
          onMouseEnterLevel={this.handleMouseEnter}
          onMouseLeaveLevel={this.handleMouseLeave}
          onClickLevel={this.handleClick}
          {...this.props}
        />
        {tooltip && (
          <Popover
            disableBackdropClick={!click}
            noPadding
            anchorEl={this.state.anchor}
            className="tooltip__popover"
            vertical={this.props.vertical}
            horizontal={this.props.horizontal}
            onClose={this.closePopup}
          >
            {tooltip}
          </Popover>
        )}
      </Fragment>
    );
  }
}

AssetAvatar = withUrl("url")(AssetAvatar);
export default AssetAvatar;
