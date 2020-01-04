import "./table.scss";

import GVButton from "components/gv-button";
import Link from "components/link/link";
import React from "react";

export const ToolbarButton: React.FC<{
  text: string;
  route: string;
}> = React.memo(({ text, route }) => (
  <Link to={route} className="toolbar-button">
    <GVButton bold noPadding color="primary" variant="text">
      {text}
    </GVButton>
  </Link>
));
