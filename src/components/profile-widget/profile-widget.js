import "./profile-widget.scss";

import { DetailsIcon, LogoutIcon, SettingsIcon } from "components/icon/icon";
import Popover from "components/popover/popover";
import { GVButton } from "gv-react-components";
import { PROFILE_ROUTE } from "modules/profile/profile.constants";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import UserIcon from "shared/media/user-avatar.svg";

class ProfileWidget extends Component {
  state = {
    anchor: null
  };

  handleOpen = event => this.setState({ anchor: event.currentTarget });

  handleClose = () => this.setState({ anchor: null });

  render() {
    const { t } = this.props;
    return (
      <div className={"profile-widget"}>
        <div className={"profile-widget__avatar"} onClick={this.handleOpen}>
          <img
            alt={this.props.name}
            className={"profile-widget__image"}
            src={this.props.avatar || UserIcon}
          />
        </div>
        <Popover
          anchorEl={this.state.anchor}
          onClose={this.handleClose}
          horizontal={"right"}
        >
          <div className="profile-menu">
            <div className={"profile-menu__header"}>{this.props.email}</div>
            <div className="profile-menu__item profile-menu__item--details">
              <Link to={PROFILE_ROUTE}>
                <DetailsIcon />
                {t("profile-widget.personal-details")}
              </Link>
            </div>
            <div className="profile-menu__item profile-menu__item--settings">
              <Link to={PROFILE_ROUTE}>
                <SettingsIcon />
                {t("profile-widget.settings")}
              </Link>
            </div>
            <div className="profile-menu__item profile-menu__item--logout">
              <GVButton variant="text">
                <LogoutIcon />
                {t("profile-widget.logout")}
              </GVButton>
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}

ProfileWidget.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  logout: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired
};

export default translate()(ProfileWidget);
