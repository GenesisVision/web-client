import Header from "components/header/header";
import { fetchProfileHeaderInfo } from "components/header/header.service";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { updateCurrency } from "modules/currency-select/services/currency-select.service";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { headerSelector } from "reducers/header-reducer";

const _HeaderContainer: React.FC<Props & WithRouterProps> = ({ router }) => {
  const dispatch = useDispatch();
  const info = useSelector(headerSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const headerAccountCurrency = useAccountCurrency();
  useEffect(() => {
    if (isAuthenticated) dispatch(fetchProfileHeaderInfo);
    if (headerAccountCurrency) updateCurrency(headerAccountCurrency);
  }, [isAuthenticated, headerAccountCurrency]);

  return <Header profileHeader={info} backPath={router.pathname} />;
};

interface Props {}

const HeaderContainer = withRouter(React.memo(_HeaderContainer));
export default HeaderContainer;
