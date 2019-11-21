import "./profile-widget.scss";

import classNames from "classnames";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import GVButton from "components/gv-button";
import { DetailsIcon } from "components/icon/details-icon";
import { LogoutIcon } from "components/icon/logout-icon";
import { SecurityIcon } from "components/icon/security-icon";
import { SettingsIcon } from "components/icon/settings-icon";
import Link from "components/link/link";
import Popover, { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import {
  PROFILE_ROUTE,
  REFERRAL_PROGRAM_ROUTE,
  SECURITY_ROUTE,
  SETTINGS_ROUTE
} from "components/profile/profile.constants";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import withLoader from "decorators/with-loader";
import { ProfileHeaderViewModel } from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _ProfileWidget: React.FC<Props> = ({
  profileHeader,
  logout,
  className
}) => {
  const [t] = useTranslation();
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <div className={classNames("profile-widget", className)}>
      <div className="profile-widget__content" onClick={setAnchor}>
        <ProfileAvatar
          url={profileHeader.avatar}
          alt={profileHeader.email}
          className="profile-widget__avatar"
        />
        <FilterArrowIcon isOpen={!!anchor} />
      </div>
      <Popover
        anchorEl={anchor}
        onClose={clearAnchor}
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      >
        <div className="profile-menu">
          <div className="profile-menu__header">{profileHeader.email}</div>
          <div className="profile-menu__container">
            <div className="profile-menu__item profile-menu__item--details">
              <Link to={PROFILE_ROUTE} onClick={clearAnchor}>
                <DetailsIcon />
                {t("profile-widget.personal-details")}
              </Link>
            </div>
            <div className="profile-menu__item profile-menu__item--settings">
              <Link to={SETTINGS_ROUTE} onClick={clearAnchor}>
                <SettingsIcon />
                {t("profile-widget.settings")}
              </Link>
            </div>
            <div className="profile-menu__item profile-menu__item--security">
              <Link to={SECURITY_ROUTE} onClick={clearAnchor}>
                <SecurityIcon />
                {t("profile-widget.security")}
              </Link>
            </div>
            <div className="profile-menu__item profile-menu__item--security">
              <Link to={REFERRAL_PROGRAM_ROUTE} onClick={clearAnchor}>
                <SecurityIcon />
                {t("profile-page.tabs.referral-program")}
              </Link>
            </div>
            <div className="profile-menu__item profile-menu__item--logout">
              <GVButton variant="text" onClick={logout}>
                <>
                  <LogoutIcon />
                  {t("profile-widget.logout")}
                </>
              </GVButton>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

interface Props {
  profileHeader: ProfileHeaderViewModel;
  logout: () => void;
  className?: string;
}

const ProfileWidget = withLoader(React.memo(_ProfileWidget));
export default ProfileWidget;
