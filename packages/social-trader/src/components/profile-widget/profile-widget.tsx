import "./profile-widget.scss";

import classNames from "classnames";
import { logout } from "components/auth/signin/signin.service";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import GVButton from "components/gv-button";
import { DetailsIcon } from "components/icon/details-icon";
import { LogoutIcon } from "components/icon/logout-icon";
import { ReferrerIcon } from "components/icon/referrer-icon";
import { SecurityIcon } from "components/icon/security-icon";
import { SettingsIcon } from "components/icon/settings-icon";
import Link, { ToType } from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Popover, { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import {
  PopoverContentCardBlock,
  PopoverContentCardBlockItem
} from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
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
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const ProfileMenuItem: React.FC<{
  to?: ToType | string;
  onClick: VoidFunction;
  label: any;
  Icon: React.ComponentType;
}> = React.memo(({ Icon, to, onClick, label }) => {
  const renderLabel = () => (
    <div className={classNames("profile-menu__item")}>
      <Icon />
      <div className="profile-menu__item-label">{label}</div>
    </div>
  );
  const renderButton = () =>
    to ? (
      <Link to={to} onClick={onClick}>
        {renderLabel()}
      </Link>
    ) : (
      <GVButton variant="text" color={"danger"} noPadding onClick={onClick}>
        {renderLabel()}
      </GVButton>
    );
  return (
    <PopoverContentCardBlockItem>{renderButton()}</PopoverContentCardBlockItem>
  );
});

const _ProfileWidget: React.FC<Props> = ({ profileHeader, className }) => {
  const dispatch = useDispatch();
  const handlerLogout = useCallback(() => dispatch(logout), []);
  const { linkCreator } = useToLink();
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
        <PopoverContent>
          <PopoverContentCardBlock dark>
            <div className="profile-menu__header">{profileHeader.email}</div>
          </PopoverContentCardBlock>
          <PopoverContentCardBlock>
            <ProfileMenuItem
              Icon={DetailsIcon}
              to={linkCreator(PROFILE_ROUTE)}
              onClick={clearAnchor}
              label={t("profile-widget.personal-details")}
            />
            <ProfileMenuItem
              Icon={SettingsIcon}
              to={linkCreator(SETTINGS_ROUTE)}
              onClick={clearAnchor}
              label={t("profile-widget.settings")}
            />
            <ProfileMenuItem
              Icon={SecurityIcon}
              to={linkCreator(SECURITY_ROUTE)}
              onClick={clearAnchor}
              label={t("profile-widget.security")}
            />
            <ProfileMenuItem
              Icon={ReferrerIcon}
              to={linkCreator(REFERRAL_PROGRAM_ROUTE)}
              onClick={clearAnchor}
              label={t("profile-page.tabs.referral-program")}
            />
            <div className="profile-menu__separator" />
            <ProfileMenuItem
              Icon={LogoutIcon}
              onClick={handlerLogout}
              label={t("profile-widget.logout")}
            />
          </PopoverContentCardBlock>
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface Props {
  profileHeader: ProfileHeaderViewModel;
  className?: string;
}

const ProfileWidget = withLoader(React.memo(_ProfileWidget));
export default ProfileWidget;
