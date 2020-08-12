import { mediaBreakpointLandscapeTablet } from "components/gv-styles/gv-media";
import { $paddingMedium, $walletItemSize } from "components/gv-styles/gv-sizes";
import { $boxShadow4 } from "components/gv-styles/gv-style-constants";
import { Icon } from "components/icon/icon";
import NavigationMobileContainer from "components/navigation/navigation-mobile/navigation-mobile.container";
import { withStyles } from "decorators/withStyles";
import { ProfileHeaderViewModel } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import { logout } from "pages/auth/signin/signin.service";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { TMenuItem } from "routes/menu";
import { css } from "styled-components";
import { adaptiveMargin } from "utils/style/style-mixins";

interface Props {
  className?: string;
  mobileMenuItems: TMenuItem[];
  backPath: string;
  isAuthenticated: boolean;
  profileHeader?: ProfileHeaderViewModel;
}

const dynamicStyles = css`
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

  ${mediaBreakpointLandscapeTablet("display: none !important;")}
`;

const _NavigationMobileButton: React.FC<Props> = ({
  className,
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
      <div className={className} onClick={setOpen}>
        <Icon type="menu" />
      </div>
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

const NavigationMobileButton = withStyles<Props>({ dynamicStyles })(
  React.memo(_NavigationMobileButton)
);
export default NavigationMobileButton;
