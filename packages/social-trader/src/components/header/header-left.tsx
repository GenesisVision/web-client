import { Center } from "components/center/center";
import { $paddingMedium } from "components/gv-styles/gv-sizes";
import HeaderIcon from "components/header/header-icon";
import { useMenuItems } from "components/header/header.service";
import NavigationContainer from "components/header/navigation.container";
import SearchContainer from "components/header/search.container";
import { SearchIcon } from "components/icon/search-icon";
import Navigation from "components/navigation/navigation";
import NavigationMobileButton from "components/navigation/navigation-mobile/navigation-mobile-button";
import { withStyles } from "decorators/withStyles";
import { ProfileHeaderViewModel } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import dynamic from "next/dist/next-server/lib/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

const HeaderSearchInput = dynamic(() =>
  import("components/header/header-search-input")
);

export interface Props {
  className?: string;
  profileHeader?: ProfileHeaderViewModel;
}

const staticStyles = {
  display: "flex",
  "align-items": "center",
  width: "60%",
  "justify-content": "space-between",
  "padding-right": `${$paddingMedium}px`
};

const _HeaderLeft: React.FC<Props> = ({ className, profileHeader }) => {
  const { route, asPath } = useRouter();
  const backPath = asPath ? asPath : route;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { showedMobileMenuItems, showedTopMenuItems } = useMenuItems();

  const [openSearch, setSearchIsOpen, setSearchIsClose] = useIsOpen();
  return (
    <div className={className}>
      <NavigationMobileButton
        mobileMenuItems={showedMobileMenuItems}
        backPath={backPath}
        profileHeader={profileHeader}
        isAuthenticated={isAuthenticated}
      />
      <NavigationContainer openSearch={openSearch}>
        <Navigation menuItems={showedTopMenuItems} />
      </NavigationContainer>
      <SearchContainer openSearch={openSearch}>
        <HeaderIcon>
          {openSearch ? (
            <HeaderSearchInput setSearchIsClose={setSearchIsClose} />
          ) : (
            <Center onClick={setSearchIsOpen}>
              <SearchIcon />
            </Center>
          )}
        </HeaderIcon>
      </SearchContainer>
    </div>
  );
};

export const HeaderLeft = withStyles<Props>({ staticStyles })(
  React.memo(_HeaderLeft)
);
