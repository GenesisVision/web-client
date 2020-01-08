import "./table.scss";

import Link from "components/link/link";
import React from "react";

export const ToolbarButton: React.FC<{
  text: string;
  route: string;
}> = React.memo(({ text, route }) => (
  <Link to={route} className="toolbar-button">
    {text}
  </Link>
));
