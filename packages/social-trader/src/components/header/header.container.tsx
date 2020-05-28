import Header from "components/header/header";
import { useHeaderInfo } from "components/header/header.service";
import { WithRouterProps } from "next/dist/client/with-router";
import { withRouter } from "next/router";
import * as React from "react";

const _HeaderContainer: React.FC<Props & WithRouterProps> = ({ router }) => {
  const info = useHeaderInfo();
  return <Header profileHeader={info} backPath={router.pathname} />;
};

interface Props {}

const HeaderContainer = withRouter(React.memo(_HeaderContainer));
export default HeaderContainer;
