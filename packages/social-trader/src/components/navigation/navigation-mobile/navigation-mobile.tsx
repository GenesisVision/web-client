import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import { LogoutIcon } from "components/icon/logout-icon";
import NavigationItem from "components/navigation/navigation-item";
import { ProfileHeaderViewModel } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { LOGIN_ROUTE } from "routes/app.routes";
import { TMenuItem } from "routes/menu";
import styled from "styled-components";
import { $panelBackgroundColor } from "utils/style/colors";
import {
  $fontSizeParagraph,
  $paddingSmall,
  $paddingXsmall
} from "utils/style/sizes";

import { MenuNavigationItem } from "../menu-navigation-item";

const NavigationMobileContainer = styled.div`
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;
const MobileHeader = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  padding: ${$paddingXsmall}px;
  align-items: center;
  background-color: ${$panelBackgroundColor};
`;
const MobileEmail = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.4px;
  font-size: ${$fontSizeParagraph}px;
`;
const MobileTop = styled.div`
  padding: 10px 0;
`;
const AvatarContainer = styled.div`
  flex-shrink: 0;
  margin-right: 15px;
`;

const MenuNavigationItemContainer = styled.div`
  padding: ${$paddingSmall / 2}px ${$paddingSmall}px;
`;

const _NavigationMobile: React.FC<Props> = ({
  onClose,
  isAuthenticated,
  profileHeader,
  mobileMenuItems,
  logout,
  backPath
}) => {
  const [t] = useTranslation();
  return (
    <NavigationMobileContainer>
      {isAuthenticated && profileHeader && (
        <MobileHeader>
          <AvatarContainer>
            <ProfileAvatar
              url={profileHeader.logoUrl}
              alt={profileHeader.email}
            />
          </AvatarContainer>
          <MobileEmail>{profileHeader.email}</MobileEmail>
        </MobileHeader>
      )}
      <MobileTop onClick={onClose}>
        {mobileMenuItems.map(item => (
          <MenuNavigationItem mobile item={item} key={item.label} />
        ))}
        {isAuthenticated ? (
          <NavigationItem mobile icon={<LogoutIcon primary />} onClick={logout}>
            {t("navigation.logout")}
          </NavigationItem>
        ) : (
          <NavigationItem
            mobile
            icon={<LogoutIcon primary rotate />}
            href={{
              pathname: LOGIN_ROUTE,
              state: backPath
            }}
          >
            {t("navigation.login")}
          </NavigationItem>
        )}
      </MobileTop>
    </NavigationMobileContainer>
  );
};

interface Props {
  mobileMenuItems: TMenuItem[];
  backPath: string;
  isAuthenticated: boolean;
  profileHeader?: ProfileHeaderViewModel;
  isOpenNavigation: boolean;
  onClose: () => void;
  logout: () => void;
}

const NavigationMobile = React.memo(_NavigationMobile);
export default NavigationMobile;
