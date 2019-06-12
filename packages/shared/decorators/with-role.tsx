import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { ROLE, ROLE_ENV } from "shared/constants/constants";
import { roleSelector } from "shared/reducers/header-reducer";
import { AuthRootState } from "shared/utils/types";

export interface WithRoleProps {
  role: ROLE;
}

const withRole = <T extends {}>(
  Component: React.ComponentType<T & WithRoleProps>
) =>
  compose<React.ComponentType<T>>(
    connect<WithRoleProps, null, T, AuthRootState>(
      (state: AuthRootState): WithRoleProps => {
        const role = roleSelector(state);
        return {
          role: (role.toLowerCase() as ROLE) || ROLE_ENV || ROLE.INVESTOR
        };
      }
    )
  )(Component);

export default withRole;
