import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import React from "react";
import { managerToPathCreator } from "routes/manager.routes";

import { IUserTagProps } from "./tag-components.types";

const _UserLink: React.FC<IUserTagProps> = ({
  userDetails: { url, username }
}) => {
  const { contextTitle } = useToLink();
  const to = managerToPathCreator(url, contextTitle);
  return <Link to={to}>{username}</Link>;
};
export const UserLink = React.memo(_UserLink);
