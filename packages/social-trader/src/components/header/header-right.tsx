import AuthWidgets from "components/header/auth-widgets";
import UnauthLinks from "components/header/unauth-links";
import { ProfileHeaderViewModel } from "gv-api-web";
import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import styled from "styled-components";
import { mediaBreakpointLandscapeTablet } from "utils/style/media";

export interface Props {
  profileHeader?: ProfileHeaderViewModel;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 40%;
  ${mediaBreakpointLandscapeTablet("justify-content: space-between;")}
`;

const _HeaderRight: React.FC<Props> = ({ profileHeader }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { route, asPath } = useRouter();
  const backPath = asPath ? asPath : route;
  return (
    <Container>
      {isAuthenticated ? (
        <AuthWidgets profileHeader={profileHeader} />
      ) : (
        <UnauthLinks backPath={backPath} />
      )}
    </Container>
  );
};

export const HeaderRight = React.memo(_HeaderRight);
