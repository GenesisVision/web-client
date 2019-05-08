import "./profile-widget.scss";

import classNames from "classnames";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { Link } from "react-router-dom";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import GVButton from "shared/components/gv-button";
import { DetailsIcon } from "shared/components/icon/details-icon";
import { LogoutIcon } from "shared/components/icon/logout-icon";
import { SettingsIcon } from "shared/components/icon/settings-icon";
import Popover, {
  HORIZONTAL_POPOVER_POS
} from "shared/components/popover/popover";
import {
  PROFILE_ROUTE,
  SETTINGS_ROUTE
} from "shared/components/profile/profile.constants";
import FilterArrowIcon from "shared/components/table/components/filtering/filter-arrow-icon";

interface IProfileWidgetProps {
  avatar?: string;
  logout(): void;
  email: string;
  className?: string;
}
interface IProfileWidgetState {
  anchor?: EventTarget;
}

class ProfileWidget extends React.Component<
  IProfileWidgetProps & InjectedTranslateProps,
  IProfileWidgetState
> {
  state = {
    anchor: undefined
  };

  handleOpen = (event: React.MouseEvent<HTMLDivElement>): void =>
    this.setState({ anchor: event.currentTarget });

  handleClose = (): void => this.setState({ anchor: undefined });

  render() {
    const { t, avatar = "", email = "", logout, className } = this.props;
    return (
      <div className={classNames("profile-widget", className)}>
        <div className="profile-widget__content" onClick={this.handleOpen}>
          <ProfileAvatar
            url={avatar}
            alt={email}
            className="profile-widget__avatar"
          />
          <FilterArrowIcon isOpen={Boolean(this.state.anchor)} />
        </div>
        <Popover
          anchorEl={this.state.anchor}
          onClose={this.handleClose}
          horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        >
          <div className="profile-menu">
            <div className="profile-menu__header">{email}</div>
            <div className="profile-menu__container">
              <div className="profile-menu__item profile-menu__item--details">
                <Link to={PROFILE_ROUTE} onClick={this.handleClose}>
                  <DetailsIcon />
                  {t("profile-widget.personal-details")}
                </Link>
              </div>
              <div className="profile-menu__item profile-menu__item--settings">
                <Link to={SETTINGS_ROUTE} onClick={this.handleClose}>
                  <SettingsIcon />
                  {t("profile-widget.settings")}
                </Link>
              </div>
              <div className="profile-menu__item profile-menu__item--logout">
                <GVButton variant="text" onClick={logout}>
                  <React.Fragment>
                    <LogoutIcon />
                    {t("profile-widget.logout")}
                  </React.Fragment>
                </GVButton>
              </div>
            </div>
          </div>
        </Popover>
      </div>
    );
  }
}

export default translate()(ProfileWidget);
