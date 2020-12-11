import Header from "components/header/header";
import { useHeaderInfo } from "components/header/header.service";
import * as React from "react";

const _HeaderContainer: React.FC = () => {
  const info = useHeaderInfo();
  return <Header profileHeader={info} />;
};

const HeaderContainer = React.memo(_HeaderContainer);
export default HeaderContainer;
