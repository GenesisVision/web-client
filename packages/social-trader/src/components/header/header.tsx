import { Center } from "components/center/center";
import { HeaderLeft } from "components/header/header-left";
import { HeaderRight } from "components/header/header-right";
import { ProfileHeaderViewModel } from "gv-api-web";
import * as React from "react";

export interface Props {
  profileHeader?: ProfileHeaderViewModel;
}

const _Header: React.FC<Props> = ({ profileHeader }) => {
  return (
    <Center>
      <HeaderLeft profileHeader={profileHeader} />
      <HeaderRight profileHeader={profileHeader} />
    </Center>
  );
};

const Header = React.memo(_Header);
export default Header;
