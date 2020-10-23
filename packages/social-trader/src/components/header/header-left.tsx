import { Center } from "components/center/center";
import HeaderIcon from "components/header/header-icon";
import { useMenuItems } from "components/header/header.service";
import NavigationContainer from "components/header/navigation.container";
import SearchContainer from "components/header/search.container";
import { SearchIcon } from "components/icon/search-icon";
import Navigation from "components/navigation/navigation";
import NavigationMobileButton from "components/navigation/navigation-mobile/navigation-mobile-button";
import { ProfileHeaderViewModel } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import dynamic from "next/dist/next-server/lib/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import styled from "styled-components";
import { $paddingMedium } from "utils/style/sizes";

const HeaderSearchInput = dynamic(() =>
  import("components/header/header-search-input")
);

export interface Props {
  profileHeader?: ProfileHeaderViewModel;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  justify-content: space-between;
  padding-right: ${$paddingMedium}px;
`;

const _HeaderLeft: React.FC<Props> = ({ profileHeader }) => {
  const { route, asPath } = useRouter();
  const backPath = asPath ? asPath : route;
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { showedMobileMenuItems, showedTopMenuItems } = useMenuItems();

  const [openSearch, setSearchIsOpen, setSearchIsClose] = useIsOpen();
  return (
    <Container>
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
    </Container>
  );
};

export const HeaderLeft = React.memo(_HeaderLeft);
