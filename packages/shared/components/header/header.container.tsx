import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "shared/components/header/header";
import {
  fetchProfileHeaderInfo,
  fetchTwoFactor
} from "shared/components/header/header.service";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { headerSelector } from "shared/reducers/header-reducer";
import { TMenuItem } from "shared/routes/menu";

const _HeaderContainer: React.FC<Props & WithRouterProps> = ({
  router,
  topMenuItems,
  mobileMenuItems
}) => {
  const dispatch = useDispatch();
  const info = useSelector(headerSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfileHeaderInfo);
      dispatch(fetchTwoFactor);
    }
  }, [isAuthenticated]);

  return (
    <Header
      topMenuItems={topMenuItems}
      mobileMenuItems={mobileMenuItems}
      profileHeader={info}
      backPath={router.pathname}
      isAuthenticated={isAuthenticated}
    />
  );
};

interface Props {
  mobileMenuItems: TMenuItem[];
  topMenuItems: TMenuItem[];
}

const HeaderContainer = withRouter(React.memo(_HeaderContainer));
export default HeaderContainer;
