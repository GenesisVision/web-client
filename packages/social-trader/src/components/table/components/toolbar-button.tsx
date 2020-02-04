import "./table.scss";

import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { TableToolbarItemBlock } from "components/table/components/table-toolbar-item.block";
import React from "react";

export const ToolbarButton: React.FC<{
  text: string;
  route: string;
}> = React.memo(({ text, route }) => {
  const { linkCreator } = useToLink();
  return (
    <TableToolbarItemBlock>
      <Link to={linkCreator(route)} className="toolbar-button">
        {text}
      </Link>
    </TableToolbarItemBlock>
  );
});
