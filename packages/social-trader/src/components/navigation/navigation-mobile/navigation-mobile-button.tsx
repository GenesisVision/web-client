import { Icon } from "components/icon/icon";
import NavigationMobileContainer from "components/navigation/navigation-mobile/navigation-mobile.container";
import { ProfileHeaderViewModel } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import { logout } from "pages/auth/signin/signin.service";
import * as React from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { TMenuItem } from "routes/menu";

import styles from "../navigation.module.scss";

const _NavigationMobileButton: React.FC<Props> = ({
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
      <div className={styles["navigation__menu"]} onClick={setOpen}>
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

interface Props {
  mobileMenuItems: TMenuItem[];
  backPath: string;
  isAuthenticated: boolean;
  profileHeader?: ProfileHeaderViewModel;
}

const NavigationMobileButton = React.memo(_NavigationMobileButton);
export default NavigationMobileButton;
