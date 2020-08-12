import { mediaBreakpointLandscapeTablet } from "components/gv-styles/gv-media";
import AuthWidgets from "components/header/auth-widgets";
import UnauthLinks from "components/header/unauth-links";
import { withStyles } from "decorators/withStyles";
import { ProfileHeaderViewModel } from "gv-api-web";
import { useRouter } from "next/router";
import * as React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { css } from "styled-components";

export interface Props {
  className?: string;
  profileHeader?: ProfileHeaderViewModel;
}

const staticStyles = {
  display: "flex",
  "align-items": "center",
  "justify-content": "flex-end",
  width: "40%"
};

const dynamicStyles = css`
  ${mediaBreakpointLandscapeTablet("justify-content: space-between;")}
`;

const _HeaderRight: React.FC<Props> = ({ className, profileHeader }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const { route, asPath } = useRouter();
  const backPath = asPath ? asPath : route;
  return (
    <div className={className}>
      {isAuthenticated ? (
        <AuthWidgets profileHeader={profileHeader} />
      ) : (
        <UnauthLinks backPath={backPath} />
      )}
    </div>
  );
};

export const HeaderRight = withStyles<Props>({ staticStyles, dynamicStyles })(
  React.memo(_HeaderRight)
);
