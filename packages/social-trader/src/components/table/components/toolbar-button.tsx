import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import React from "react";

export const ToolbarButton: React.FC<{
  text: string;
  route: string;
}> = React.memo(({ text, route }) => {
  const { linkCreator } = useToLink();
  return (
    <RowItem>
      <Link to={linkCreator(route)} className="toolbar-button">
        {text}
      </Link>
    </RowItem>
  );
});
