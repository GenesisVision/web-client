import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { Center } from "components/center/center";
import { DetailsIcon } from "components/icon/details-icon";
import { LogoutIcon } from "components/icon/logout-icon";
import { ReferrerIcon } from "components/icon/referrer-icon";
import { SecurityIcon } from "components/icon/security-icon";
import { SettingsIcon } from "components/icon/settings-icon";
import { useToLink } from "components/link/link.helper";
import Popover, { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { ProfileMenuItem } from "components/profile-widget/profile-menu-item";
import {
  PROFILE_ROUTE,
  REFERRAL_PROGRAM_ROUTE,
  SECURITY_ROUTE,
  SETTINGS_ROUTE
} from "components/profile/profile.constants";
import { RowItem } from "components/row-item/row-item";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import withLoader from "decorators/with-loader";
import { ProfileHeaderViewModel } from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import { logout } from "pages/auth/signin/signin.service";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { $fontSizeCommon, $paddingXxsmall } from "utils/style/sizes";

const Content = styled(Center)`
  cursor: pointer;
`;

const Separator = styled.div`
  padding: ${$paddingXxsmall}px 0;
`;

const Header = styled.div`
  font-size: ${$fontSizeCommon}px;
  padding: ${$paddingXxsmall}px 0;
`;

const _ProfileWidget: React.FC<Props> = ({ profileHeader, className }) => {
  const dispatch = useDispatch();
  const handlerLogout = useCallback(() => dispatch(logout), []);
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <div>
      <Content onClick={setAnchor}>
        <RowItem size={"small"}>
          <ProfileAvatar
            url={profileHeader.logoUrl}
            alt={profileHeader.email}
          />
        </RowItem>
        <FilterArrowIcon isOpen={!!anchor} />
      </Content>
      <Popover
        anchorEl={anchor}
        onClose={clearAnchor}
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      >
        <PopoverContent>
          <PopoverContentCardBlock dark>
            <Header>{profileHeader.email}</Header>
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
              label={t("profile-widget.referral-program")}
            />
            <Separator />
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
