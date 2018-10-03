import "./profile-widget.scss";

import classnames from "classnames";
import { DetailsIcon } from "components/icon/details-icon";
import { LogoutIcon } from "components/icon/logout-icon";
import { SettingsIcon } from "components/icon/settings-icon";
import Popover from "components/popover/popover";
import { GVButton } from "gv-react-components";
import { PROFILE_ROUTE } from "modules/profile/profile.constants";
import FilterArrowIcon from "modules/table/components/filtering/filter-arrow-icon";
import { SETTINGS_ROUTE } from "pages/profile/settings/settings.page";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import UserIcon from "shared/media/user-avatar.svg";
import fileService from "shared/services/file-service";

class ProfileWidget extends Component {
  state = {
    anchor: null
  };

  handleOpen = event => this.setState({ anchor: event.currentTarget });

  handleClose = () => this.setState({ anchor: null });

  handleClick = () => {
    this.setState({ anchor: null });
  };

  render() {
    const { t, avatar, email, logout, className } = this.props;
    return (
      <div className={classnames("profile-widget", className)}>
        <div className="profile-widget__content" onClick={this.handleOpen}>
          <div className="profile-widget__avatar">
            <img
              alt={email}
              className="profile-widget__image"
              src={fileService.getFileUrl(avatar) || UserIcon}
            />
          </div>
          <FilterArrowIcon isOpen={Boolean(this.state.anchor)} />
        </div>
        <Popover
          anchorEl={this.state.anchor}
          onClose={this.handleClose}
          horizontal={"right"}
        >
          <div className="profile-menu">
            <div className="profile-menu__header">{email}</div>
            <div className="profile-menu__container">
              <div className="profile-menu__item profile-menu__item--details">
                <Link to={PROFILE_ROUTE} onClick={this.handleClick}>
                  <DetailsIcon />
                  {t("profile-widget.personal-details")}
                </Link>
              </div>
              <div className="profile-menu__item profile-menu__item--settings">
                <Link to={SETTINGS_ROUTE} onClick={this.handleClick}>
                  <SettingsIcon />
                  {t("profile-widget.settings")}
                </Link>
              </div>
              <div className="profile-menu__item profile-menu__item--logout">
                <GVButton variant="text" onClick={logout}>
                  <LogoutIcon />
                  {t("profile-widget.logout")}
                </GVButton>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}

ProfileWidget.propTypes = {
  avatar: PropTypes.string,
  logout: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  className: PropTypes.string
};

ProfileWidget.defaultProps = {
  email: ""
};

export default translate()(ProfileWidget);
