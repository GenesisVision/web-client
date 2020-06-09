import Link, { ToType } from "components/link/link";
import { Text } from "components/text/text";
import * as React from "react";

const _DetailsSubtitle: React.FC<{
  to?: ToType;
  text: string;
}> = ({ to, text }) => {
  return (
    <Text muted weight={"bold"}>
      <Link to={to}>{text}</Link>
    </Text>
  );
};

export const DetailsSubtitle = React.memo(_DetailsSubtitle);
