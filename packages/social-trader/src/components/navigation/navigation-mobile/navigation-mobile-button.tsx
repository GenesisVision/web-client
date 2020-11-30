import { MenuIcon } from "components/icon/menu-icon";
import NavigationMobileContainer from "components/navigation/navigation-mobile/navigation-mobile.container";
import { ProfileHeaderViewModel } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import { logout } from "pages/auth/signin/signin.service";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { TMenuItem } from "routes/menu";
import styled from "styled-components";
import { mediaBreakpointLandscapeTablet } from "utils/style/media";
import { adaptiveMargin } from "utils/style/mixins";
import { $boxShadow4 } from "utils/style/shadow";
import { $paddingMedium, $walletItemSize } from "utils/style/sizes";

interface Props {
  hideOnDesktop?: boolean;
  mobileMenuItems: TMenuItem[];
  backPath: string;
  isAuthenticated: boolean;
  profileHeader?: ProfileHeaderViewModel;
}

const Container = styled.div<{ hideOnDesktop?: boolean }>`
  padding: 0;
  min-height: ${$walletItemSize}px;
  min-width: ${$walletItemSize}px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  ${adaptiveMargin("right", $paddingMedium)}

  &:hover {
    box-shadow: ${$boxShadow4};
  }

  ${({ hideOnDesktop }) =>
    hideOnDesktop
      ? mediaBreakpointLandscapeTablet("display: none !important;")
      : ""}
`;

const _NavigationMobileButton: React.FC<Props> = ({
  hideOnDesktop = true,
  mobileMenuItems,
  isAuthenticated,
  profileHeader,
  backPath
}) => {
  const dispatch = useDispatch();
  const [isOpen, setOpen, setClose] = useIsOpen();
  const handlerLogout = useCallback(() => dispatch(logout), []);
  return (
    <>
      <Container hideOnDesktop={hideOnDesktop} onClick={setOpen}>
        <MenuIcon />
      </Container>
      <NavigationMobileContainer
        mobileMenuItems={mobileMenuItems}
        backPath={backPath}
        logout={handlerLogout}
        isOpenNavigation={isOpen}
        profileHeader={profileHeader}
        isAuthenticated={isAuthenticated}
        onClose={setClose}
      />
    </>
  );
};

const NavigationMobileButton = React.memo(_NavigationMobileButton);
export default NavigationMobileButton;
