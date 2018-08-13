import Avatar from "components/avatar/avatar";
import Popover from "components/popover/popover";
import React from "react";

class ProfileWidget extends React.Component {
  state = {
    anchorEl: null
  };

  openMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <div className={"profile-widget"} onClick={this.openMenu}>
        <Avatar url={this.props.avatar} />
        <Popover
          anchorEl={this.state.anchorEl}
          onClose={this.closeMenu}
          horizontal={"right"}
        >
          <a href={"/"}>log out</a>
        </Popover>
      </div>
    );
  }
}

export default ProfileWidget;
