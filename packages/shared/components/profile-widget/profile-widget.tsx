import "./profile-widget.scss";

import classNames from "classnames";
import { ProfileHeaderViewModel } from "gv-api-web";
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

import withLoader from "shared/decorators/with-loader";

class _ProfileWidget extends React.PureComponent<Props, State> {
  state = {
    anchor: undefined
  };

  handleOpen = (event: React.MouseEvent<HTMLDivElement>): void =>
    this.setState({ anchor: event.currentTarget });

  handleClose = (): void => this.setState({ anchor: undefined });

  render() {
    const { t, profileHeader, logout, className } = this.props;
    return (
      <div className={classNames("profile-widget", className)}>
        <div className="profile-widget__content" onClick={this.handleOpen}>
          <ProfileAvatar
            url={profileHeader.avatar}
            alt={profileHeader.email}
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
            <div className="profile-menu__header">{profileHeader.email}</div>
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

interface Props extends InjectedTranslateProps {
  profileHeader: ProfileHeaderViewModel;
  logout(): void;
  className?: string;
}
interface State {
  anchor?: EventTarget;
}

const ProfileWidget = withLoader(translate()(_ProfileWidget));
export default ProfileWidget;
