import "./details-description.scss";

import * as React from "react";
import GVButton from "shared/components/gv-button";
import Link, { ToType } from "shared/components/link/link";

const _DetailsManager: React.FC<{
  to: ToType;
  username: string;
}> = ({ to, username }) => {
  return (
    <Link to={to}>
      <GVButton
        variant="text"
        className="asset-details-description__author-btn"
      >
        {username}
      </GVButton>
    </Link>
  );
};

export const DetailsManager = React.memo(_DetailsManager);
